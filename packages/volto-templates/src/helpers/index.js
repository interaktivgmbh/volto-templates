import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import hoistNonReactStatics from 'hoist-non-react-statics';
import config from '@plone/volto/registry';
import { getContent } from '@plone/volto/actions/content/content';

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
          clearInterval(interval);
          return;
        }

        // Used RegEx to differentiate between edit view and random paths containing the substring /edit
        if (!/\/edit(?:$|#|\?|\/)/.test(url) && pathname.includes(url)) {
          takeScreenshot(
            isElement(thumbnailRef) ? thumbnailRef : thumbnailRef.current,
          ).then((image) => {
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
            });
          });

          clearInterval(interval);
        }
      }, 500);
    },
  );
}

function isElement(obj) {
  try {
    return obj instanceof HTMLElement;
  } catch (e) {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      obj.nodeType === 1 &&
      typeof obj.nodeName === 'string'
    );
  }
}

/**
 * Helper function to extract the actual DOM element from various ref structures
 * Based on the common patterns used in the codebase
 * @param {any} element - The element reference
 * @returns {HTMLElement|null} The actual DOM element
 */
export const getActualElement = (element) => {
  if (!element) return null;

  if (element.nodeType === Node.ELEMENT_NODE) {
    return element;
  }

  if (element.current?.ref?.current) {
    return element.current.ref.current;
  }

  if (element.current?.inputRef?.current) {
    return element.current.inputRef.current;
  }

  if (element.current) {
    if (element.current.nodeType === Node.ELEMENT_NODE) {
      return element.current;
    }
  }

  if (element.ref?.current) {
    return element.ref.current;
  }

  if (element.inputRef?.current) {
    return element.inputRef.current;
  }

  return null;
};

/**
 * General key handler used for modals
 * @param {KeyboardEvent} event the keydown event
 * @param {any} firstRef the ref of the first focusable element
 * @param {any} lastRef the ref of the last focusable element
 * @param {function} onClose function to be called when the Esc key is pressed
 */
export const modalKeyHandler = (event, firstRef, lastRef, onClose) => {
  if (!firstRef || !lastRef) return;

  const activeElement = document.activeElement;

  // focus trap: trap the focus between first and last ref
  if (!event.shiftKey && event.key === 'Tab' && activeElement === lastRef) {
    event.preventDefault();
    firstRef.focus();
    return;
  }

  if (event.shiftKey && event.key === 'Tab' && activeElement === firstRef) {
    event.preventDefault();
    lastRef.focus();
  }

  // close modal on esc
  if (event.key === 'Esc' || event.key === 'Escape') {
    onClose();
  }
};

/**
 * Copied from https://github.com/plone/volto/blob/7daa83754c9383530d3c5c97181eda19e4d79583/packages/volto/src/helpers/Content/withClientSideContent.jsx#L20
 * This function is included here because this addon may be used with older Volto versions
 * where withClientSideContent is not available.
 */
export default function withClientSideContent(WrappedComponent) {
  function WithClientSideContent(props) {
    const { internalApiPath } = config.settings;
    const dispatch = useDispatch();
    const content = useSelector((state) => state.content);
    const id = content.data?.['@id'];
    useEffect(() => {
      if (internalApiPath && id?.startsWith(internalApiPath)) {
        dispatch(getContent(id.substring(internalApiPath.length)));
      }
    }, [internalApiPath, dispatch, id]);
    return <WrappedComponent {...props} />;
  }

  return hoistNonReactStatics(WithClientSideContent, WrappedComponent);
}
