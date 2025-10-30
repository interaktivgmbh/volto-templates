import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

function useBlocker(blocker, when = true) {
  const history = useHistory();
  const unblockRef = useRef(null);

  useEffect(() => {
    if (!when) {
      if (unblockRef.current) {
        unblockRef.current();
        unblockRef.current = null;
      }
      return;
    }

    unblockRef.current = history.block((location, action) => {
      const shouldBlock = blocker({
        currentLocation: history.location,
        nextLocation: location,
        historyAction: action,
      });

      if (shouldBlock) {
        // Return false to block the navigation
        return false;
      }
    });

    return () => {
      if (unblockRef.current) {
        unblockRef.current();
        unblockRef.current = null;
      }
    };
  }, [blocker, when, history]);
}

export default useBlocker;
