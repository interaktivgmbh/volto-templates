import {GET_SELECTABLE_TEMPLATES} from "../../constants/ActionTypes";

export const initialState = {
  selectableTemplates: {
    error: null,
    loaded: false,
    loading: false,
    items: [],
  },
  showTemplatesModal: false,
  thumbnailCreationFlag: false,
};

export default function templates(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_THUMBNAIL_CREATION':
      return {
        ...state,
        thumbnailCreationFlag: !state.thumbnailCreationFlag,
      };

    case 'TOGGLE_SHOW_TEMPLATES_MODAL':
      return {
        ...state,
        showTemplatesModal: !state.showTemplatesModal,
      };

    /* SELECTABLE TEMPLATES */

    case `${GET_SELECTABLE_TEMPLATES}_PENDING`:
      return {
        ...state,
        selectableTemplates: {
          ...state.selectableTemplates,
          error: null,
          loaded: false,
          loading: true,
        },
      };

    case `${GET_SELECTABLE_TEMPLATES}_SUCCESS`:
      return {
        ...state,
        selectableTemplates: {
          ...state.selectableTemplates,
          error: null,
          loaded: true,
          loading: false,
          items: action.result.items,
        },
      };

    case `${GET_SELECTABLE_TEMPLATES}_FAIL`:
      return {
        ...state,
        selectableTemplates: {
          ...state.selectableTemplates,
          error: 'failed',
          loaded: false,
          loading: false,
        },
      };

    default:
      return state;
  }
}
