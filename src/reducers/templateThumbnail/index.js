import { TRIGGER_THUMBNAIL_CREATION } from '../../constants/ActionTypes';

const initialState = {
  trigger: 0,
}

export default function templateThumbnail(state = initialState, action) {
  switch (action.type) {
    case 'TRIGGER_THUMBNAIL_CREATION':
      return {
        ...state,
        trigger: state.trigger + 1
      }
    default:
      return state;
  }
}
