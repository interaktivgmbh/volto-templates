import {
  GET_SHOW_TEMPLATES_MODAL,
  TOGGLE_SHOW_TEMPLATES_MODAL,
  SET_SHOW_TEMPATES_MODAL
} from '../../constants/ActionTypes'

const initialState = {
  show: false
}

/**
 * @param {{ show: boolean }} state 
 * @param {{ type: typeof GET_SHOW_TEMPLATES_MODAL | typeof TOGGLE_SHOW_TEMPLATES_MODAL | typeof SET_SHOW_TEMPATES_MODAL, show?: boolean }} action 
 * @returns {{ show: boolean }}
 */
export default function showTemplatesModal (state = initialState, action) {
  switch (action.type) {
    case 'GET_SHOW_TEMPLATES_MODAL':
      return state
    case 'TOGGLE_SHOW_TEMPLATES_MODAL':
      return {
        show: !state.show
      }
    case 'SET_SHOW_TEMPLATES_MODAL':
      return {
        show: action.show ?? false
      }
    default:
      return state
  }
}