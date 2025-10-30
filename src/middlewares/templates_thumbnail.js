import {
  CREATE_CONTENT,
  UPDATE_CONTENT,
} from '@plone/volto/constants/ActionTypes';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { createThumbnail } from '../actions';

let creatingThumbnail = false;

const templates_thumbnail = (middlewares) => [
  ...middlewares,
  (store) => (next) => (action) => {
    switch (action.type) {
      case `${CREATE_CONTENT}_SUCCESS`:
        const { result } = action;
        if (result['@type'] === 'Template') {
          store.dispatch(createThumbnail(flattenToAppURL(result['@id'])));
          creatingThumbnail = true;
        }
        break;

      case `${UPDATE_CONTENT}_SUCCESS`:
        if (creatingThumbnail) {
          creatingThumbnail = false;
          break;
        }
        const content = store.getState().content.data;
        const templates =
          store.getState().templates.selectableTemplates?.items || [];

        if (templates.some((t) => t.UID === content['UID'])) {
          store.dispatch(createThumbnail(flattenToAppURL(content['@id'])));
          creatingThumbnail = true;
        }
        break;

      default:
        break;
    }

    return next(action);
  },
];

export default templates_thumbnail;
