import withClientSideContent from './helpers';

import reducers from './reducers';

import TemplatesScreenshot from './appextras/TemplatesScreenshot';
import TemplatesToolbar from './appextras/TemplatesToolbar';

import TemplateAdd from './TemplateAdd';
import TemplateEdit from './TemplateEdit';

import packSVG from '@plone/volto/icons/pack.svg';

import './theme/template-modal.scss';

const applyConfig = (config) => {
  config.addonReducers = { ...config.addonReducers, ...reducers };

  // Add app extras
  config.settings.appExtras = [
    ...(config.settings.appExtras || []),
    {
      match: '',
      component: TemplatesScreenshot,
    },
    {
      match: '',
      component: TemplatesToolbar,
    },
  ];

  // Add Templates related icons
  config.settings.contentIcons = {
    ...config.settings.contentIcons,
    TemplatesContainer: packSVG,
    Template: packSVG,
  };

  // Add
  config.addonRoutes = [
    ...(config.addonRoutes || []),
    {
      path: ['/template-add', '/**/template-add'],
      component: withClientSideContent(TemplateAdd),
    },
    {
      path: ['/template-edit', '/**/template-edit'],
      component: withClientSideContent(TemplateEdit),
    },
  ];

  // Add template edit to non content routes
  config.settings.nonContentRoutes = [
    ...config.settings.nonContentRoutes,
    /\/template-add$/,
    /\/template-edit$/,
  ];

  return config;
};

export default applyConfig;
