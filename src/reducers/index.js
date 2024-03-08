/* istanbul ignore file */
import defaultReducers from '@plone/volto/reducers';

import selectabletemplates from './selectable-templates';
import showTemplatesModal from './showTemplatesModal'

const reducers = {
  ...defaultReducers,
  selectabletemplates,
  showTemplatesModal
};

export default reducers;
