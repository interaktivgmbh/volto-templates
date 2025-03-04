import {TRIGGER_THUMBNAIL_CREATION} from '../../constants/ActionTypes';

const initialState = {
  processRunning: false,
}

export default function thumbnailCreation(state = initialState, action) {
  switch (action.type) {
    case `${TRIGGER_THUMBNAIL_CREATION}_RUNNING`:
      return {
        ...state,
        processRunning: true,
      };
    case `${TRIGGER_THUMBNAIL_CREATION}_RESET`:
      return {
        ...state,
        processRunning: false,
      }
    default:
      return state;
  }
}
