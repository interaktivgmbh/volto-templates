import {
  GET_SELECTABLE_TEMPLATES,
  TOGGLE_SHOW_TEMPLATES_MODAL, TOGGLE_THUMBNAIL_CREATION
} from "../../constants/ActionTypes";

export function getSelectableTemplates() {
  const path = '/@search';

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
    type: TOGGLE_SHOW_TEMPLATES_MODAL
  }
}
