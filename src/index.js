import reducers from './reducers';

import './theme/template-modal.scss';

const applyConfig = (config) => {
  config.addonReducers = { ...config.addonReducers, ...reducers };

  return config;
};

export default applyConfig;
