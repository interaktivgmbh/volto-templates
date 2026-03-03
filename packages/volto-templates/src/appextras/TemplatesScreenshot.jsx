import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateContent } from '@plone/volto/actions/content/content';
import { setThumbnailCallback } from '../actions';
import { initThumbnailHandler } from '../helpers';

function dispatchAction(dispatch, action) {
  return (...args) => dispatch(action(...args));
}

function TemplatesScreenshotComponent({ takeScreenshot, pathname }) {
  const dispatch = useDispatch();
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    initThumbnailHandler({
      setThumbnailCallback: dispatchAction(dispatch, setThumbnailCallback),
      updateContent: dispatchAction(dispatch, updateContent),
      getPathname: () => pathnameRef.current,
      takeScreenshot,
      thumbnailRef: document.getElementById('main'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathnameRef]);

  return null;
}

function TemplatesScreenshot(props) {
  const token = useSelector((state) => state.userSession.token);
  const [ScreenshotComponent, setScreenshotComponent] = useState(null);

  useEffect(() => {
    if (token && !ScreenshotComponent) {
      import('../hoc/withScreenshot').then((mod) => {
        setScreenshotComponent(() => mod.default(TemplatesScreenshotComponent));
      });
    }
  }, [token, ScreenshotComponent]);

  if (!token || !ScreenshotComponent) return null;

  return <ScreenshotComponent {...props} />;
}

export default TemplatesScreenshot;
