import { GET_SELECTABLE_TEMPLATES } from '../../constants/ActionTypes';

export const initialState = {
  error: null,
  loaded: false,
  loading: false,
  items: [],
};

export default function selectabletemplates(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_SELECTABLE_TEMPLATES}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_SELECTABLE_TEMPLATES}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        items: action.result.items,
      };
    case `${GET_SELECTABLE_TEMPLATES}_FAIL`:
      return {
        ...state,
        error: 'failed',
        loaded: false,
        loading: false,
      };

    default:
      return state;
  }
}
