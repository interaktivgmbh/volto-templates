export function initThumbnailHandler({
     setThumbnailCallback,
     getPathname,
     takeScreenshot,
     updateContent,
     thumbnailRef,
 }) {
    setThumbnailCallback((url) => {
        const maxRetries = 5;
        let attempts = 0;

        const interval = setInterval(() => {
            attempts++;

            const pathname = getPathname();
            if (!pathname.includes('/edit') && pathname.includes(url)) {
                takeScreenshot(thumbnailRef.current).then((image) => {
                    const fields = image.match(/^data:(.*);(.*),(.*)$/);
                    updateContent(url, {
                        template_thumbnail: {
                            data: fields[3],
                            encoding: fields[2],
                            'content-type': fields[1],
                            filename: 'thumbnail',
                        },
                    });
                });

                clearInterval(interval);
            } else if (attempts >= maxRetries) {
                console.warn('Max retries reached. Stopping interval.');
                clearInterval(interval);
            }
        }, 500);
    });
}