/**
 * @param {object} arg0
 * @param {(cb: ((url: string) => void)) => void} arg0.setThumbnailCallback
 * @param {() => string} arg0.getPathname
 * @param {(element: HTMLElement) => Promise<string>} arg0.takeScreenshot
 * @param {(url: string, content: { template_thumbnail?: { data: string, encoding: string, 'content-type': string, filename: string}}) => void} arg0.updateContent
 * @param {import('react').RefObject<HTMLElement>} arg0.thumbnailRef
 * @returns {void}
 */
export function initThumbnailHandler({
  setThumbnailCallback,
  getPathname,
  takeScreenshot,
  updateContent,
  thumbnailRef,
}) {
  const maxRetries = 5;

  setThumbnailCallback(
    /**
     * @param {string} url
     * @returns {void}
     */
    (url) => {
      let attempts = 0;

      const interval = setInterval(() => {
        const pathname = getPathname();

        if (++attempts === maxRetries) {
          console.warn('Max retries reached. Stopping interval.');
          clearInterval(interval);
          return;
        }

        // Used RegEx to differentiate between edit view and random paths containing the substring /edit
        if (!/\/edit(?:$|#|\?|\/)/.test(url) && pathname.includes(url)) {
          takeScreenshot(thumbnailRef.current)
            .then((image) => {
              const { data, encoding, contentType } = image.match(
                /^data:(?<contentType>.*);(?<encoding>.*),(?<data>.*)$/,
              ).groups;

              updateContent(url, {
                template_thumbnail: {
                  data,
                  encoding,
                  'content-type': contentType,
                  filename: 'thumbnail',
                },
              }).catch((err) => {
                console.warn('Error whle trying to set thumbnail.', err);
              });
            })
            .catch((err) => {
              console.warn('Error whle trying to set thumbnail.', err);
            });

          clearInterval(interval);
        }
      }, 500);
    },
  );
}
