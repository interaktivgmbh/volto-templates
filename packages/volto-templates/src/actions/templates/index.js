import { GET_SCHEMA } from '@plone/volto/constants/ActionTypes';
import {
  CREATE_TEMPLATE_THUMBNAIL,
  GET_SELECTABLE_TEMPLATES,
  SET_TEMPLATE_THUMBNAIL_CALLBACK,
  TOGGLE_SHOW_TEMPLATES_MODAL,
} from '../../constants/ActionTypes';

export function getSchema(type, url, template) {
  url = typeof url !== 'undefined' ? url : '';

  let path = `${url}/@types/${type}`;

  if (template) {
    path += `?template=${template}`;
  }

  return {
    type: GET_SCHEMA,
    request: {
      op: 'get',
      path: path,
    },
  };
}

export function getSelectableTemplates() {
  return {
    type: GET_SELECTABLE_TEMPLATES,
    request: {
      op: 'get',
      path: `/@search?portal_type=Template&metadata_fields=UID&metadata_fields=template_description&metadata_fields=template_thumbnail`,
    },
  };
}

export function toggleShowTemplatesModal() {
  return {
    type: TOGGLE_SHOW_TEMPLATES_MODAL,
  };
}

export function setThumbnailCallback(callback) {
  return {
    type: SET_TEMPLATE_THUMBNAIL_CALLBACK,
    payload: callback,
  };
}

export function createThumbnail(url) {
  return {
    type: CREATE_TEMPLATE_THUMBNAIL,
    payload: url,
  };
}
