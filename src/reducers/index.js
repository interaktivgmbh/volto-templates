/* istanbul ignore file */
import defaultReducers from '@plone/volto/reducers';

import selectabletemplates from './selectable-templates';
import showTemplatesModal from './showTemplatesModal'
import templateThumbnail from './templateThumbnail';
import templateContainer from './templateContainer';

const reducers = {
  ...defaultReducers,
  selectabletemplates,
  showTemplatesModal,
  templateThumbnail,
  templateContainer
};

export default reducers;
