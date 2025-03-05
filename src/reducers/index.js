/* istanbul ignore file */
import defaultReducers from '@plone/volto/reducers';

import templates from './templates';
import templateContainer from './templateContainer';

const reducers = {
  ...defaultReducers,
  templates,
  templateContainer,
};

export default reducers;
