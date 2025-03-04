import {TRIGGER_THUMBNAIL_CREATION} from "../../constants/ActionTypes";

export function toggleThumbnailCreation(type) {
  return {
    type: `${TRIGGER_THUMBNAIL_CREATION}_${type}`,
  }
}
