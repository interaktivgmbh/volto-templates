import { TRIGGER_THUMBNAIL } from '../../constants/ActionTypes';

const initialState = {
  trigger: 0,
}

export default function templateThumbnail(state = initialState, action) {
  switch (action.type) {
    case 'TRIGGER_THUMBNAIL':
      return {
        ...state,
        trigger: state.trigger + 1
      }
    default:
      return state;
  }
}
