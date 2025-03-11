import {GENERATE_TEMPLATE_THUMBNAIL} from "../../constants/ActionTypes";

export function generateThumbnail(url, modified = false) {
  const path = '/@template-thumbnail';

  return {
    type: GENERATE_TEMPLATE_THUMBNAIL,
    request: {
      op: 'post',
      path: path,
      data: { url, modified },
    },
  };
}
