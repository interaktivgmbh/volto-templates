import { GET_SELECTABLE_TEMPLATES } from '../../constants/ActionTypes';

export function getSelectableTemplates() {
  const path = '/@search';

  return {
    type: GET_SELECTABLE_TEMPLATES,
    request: {
      op: 'get',
      path: `/@search?portal_type=Template&metadata_fields=UID&metadata_fields=template_description`,
    },
  };
}
