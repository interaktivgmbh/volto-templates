import { GET_TEMPLATE_CONTAINERS } from '../../constants/ActionTypes';

export function getTemplateContainers(url) {

  return {
    type: GET_TEMPLATE_CONTAINERS,
    request: {
      op: 'get',
      path: `/@template-container?url=${url}`,
    },
  };
}
