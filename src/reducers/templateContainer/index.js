import { GET_TEMPLATE_CONTAINERS } from '../../constants/ActionTypes';

export const initialState = {
  error: null,
  loaded: false,
  loading: false,
  data: [],
};

export default function templateContainer(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_TEMPLATE_CONTAINERS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_TEMPLATE_CONTAINERS}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        data: action.result,
      };
    case `${GET_TEMPLATE_CONTAINERS}_FAIL`:
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
