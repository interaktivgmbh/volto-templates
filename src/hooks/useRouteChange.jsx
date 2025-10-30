import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

/**
 * useRouteChange
 *
 * @param {Function} onChange - called after route changes
 * @param {Function} onBlock - optional; return false to block, or a string to show a confirm message
 */
export default function useRouteChange(onChange, onBlock) {
  const history = useHistory();

  useEffect(() => {
    let unblock;
    let unlisten;

    // ✅ If blocking logic is provided
    if (onBlock) {
      unblock = history.block((tx) => {
        const result = onBlock(tx);
        if (result === false) {
          // completely cancel navigation
          return false;
        }
        if (typeof result === 'string') {
          // show default confirm dialog
          return result;
        }
        return true; // allow navigation
      });
    }

    // ✅ Always listen for successful navigation
    if (onChange) {
      unlisten = history.listen((location, action) => {
        onChange(location, action);
      });
    }

    return () => {
      if (unblock) unblock();
      if (unlisten) unlisten();
    };
  }, [history, onChange, onBlock]);
}
