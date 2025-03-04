/* istanbul ignore file */
import defaultReducers from '@plone/volto/reducers';

import selectabletemplates from './selectable-templates';
import showTemplatesModal from './showTemplatesModal'
import thumbnailCreation from './thumbnailCreation';

const reducers = {
  ...defaultReducers,
  selectabletemplates,
  showTemplatesModal,
  thumbnailCreation
};

export default reducers;
