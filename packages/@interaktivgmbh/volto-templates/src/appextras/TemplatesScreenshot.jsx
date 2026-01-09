import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateContent } from '@plone/volto/actions/content/content';
import { setThumbnailCallback } from '../actions';
import { initThumbnailHandler } from '../helpers';

import withScreenshot from '../hoc/withScreenshot';

function dispatchAction(dispatch, action) {
  return (...args) => dispatch(action(...args));
}

function TemplatesScreenshot(props) {
  const dispatch = useDispatch();
  const pathname = useRef(props.pathname);

  useEffect(() => {
    pathname.current = props.pathname;
  }, [props.pathname]);

  useEffect(() => {
    initThumbnailHandler({
      setThumbnailCallback: dispatchAction(dispatch, setThumbnailCallback),
      updateContent: dispatchAction(dispatch, updateContent),
      getPathname: () => pathname.current,
      takeScreenshot: props.takeScreenshot,
      thumbnailRef: document.getElementById('main'),
    });
  }, [pathname]);

  return null;
}

export default withScreenshot(TemplatesScreenshot);
