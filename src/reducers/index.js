/* istanbul ignore file */
import defaultReducers from '@plone/volto/reducers';

import selectabletemplates from './selectable-templates';

const reducers = {
  ...defaultReducers,
  selectabletemplates,
};

export default reducers;
