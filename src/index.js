import reducers from './reducers';

import TemplatesScreenshot from './appextras/TemplatesScreenshot';
import TemplatesToolbar from './appextras/TemplatesToolbar';
import TemplatesEdit from './appextras/TemplatesEdit';
import templates_thumbnail from './middlewares/templates_thumbnail';

import packSVG from '@plone/volto/icons/pack.svg';

import './theme/template-modal.scss';

const applyConfig = (config) => {
  config.addonReducers = { ...config.addonReducers, ...reducers };

  // Add app extras
  config.settings.appExtras = [
    ...(config.settings.appExtras || []),
    {
      match: ['*/edit', '*/add'],
      component: TemplatesEdit,
    },
    {
      match: '',
      component: TemplatesScreenshot,
    },
    {
      match: '',
      component: TemplatesToolbar,
    },
  ];

  // Add content icons
  config.settings.contentIcons = {
    ...config.settings.contentIcons,
    TemplatesContainer: packSVG,
    Template: packSVG,
  };

  // Add store extenders
  config.settings.storeExtenders = [
    ...(config.settings.storeExtenders || []),
    templates_thumbnail,
  ];

  Object.values(config.blocks.blocksConfig).forEach((block) => {
    const Edit = block.edit;
    block.edit = (props) => {
      return <Edit {...props} manage />;
    };
  });

  return config;
};

export default applyConfig;
