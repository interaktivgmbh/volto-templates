import { useEffect } from 'react';
import { getActualElement, modalKeyHandler } from './index';

/**
 * Custom hook for handling modal keyboard navigation
 * @param {any} firstElement - Reference to the first focusable element (can be ref, DOM element, or component)
 * @param {any} lastElement - Reference to the last focusable element (can be ref, DOM element, or component)
 * @param {boolean} open - Whether the modal is open
 * @param {Function} onClose - Function to close the modal
 */
export const useModalKeyHandler = (
  firstElement,
  lastElement,
  open,
  onClose,
) => {
  useEffect(() => {
    if (!open) return;

    const actualFirstElement = getActualElement(firstElement);
    const actualLastElement = getActualElement(lastElement);

    if (!actualFirstElement || !actualLastElement) {
      return;
    }

    const handleKeyDown = (event) => {
      if (actualFirstElement && actualLastElement) {
        modalKeyHandler(event, actualFirstElement, actualLastElement, onClose);
      }
    };

    actualFirstElement.focus();

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, firstElement?.current, lastElement?.current]);
};
