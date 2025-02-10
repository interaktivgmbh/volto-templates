/* istanbul ignore file */
import defaultReducers from '@plone/volto/reducers';

import selectabletemplates from './selectable-templates';
import showTemplatesModal from './showTemplatesModal'
import templateThumbnail from './templateThumbnail';

const reducers = {
  ...defaultReducers,
  selectabletemplates,
  showTemplatesModal,
  templateThumbnail
};

export default reducers;
