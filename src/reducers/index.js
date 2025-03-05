/* istanbul ignore file */
import defaultReducers from '@plone/volto/reducers';

import templates from './templates';

const reducers = {
  ...defaultReducers,
  templates,
};

export default reducers;
