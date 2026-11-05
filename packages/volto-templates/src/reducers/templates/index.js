import { GET_SELECTABLE_TEMPLATES } from '../../constants/ActionTypes';

export const initialState = {
  selectableTemplates: {
    error: null,
    loaded: false,
    loading: false,
    items: [],
  },
  showTemplatesModal: false,
  // content type whose /add navigation opened the modal
  modalContentType: null,
  thumbnailCallback: null,
};

export default function templates(state = initialState, action) {
  switch (action.type) {
    /* TEMPLATE THUMBNAIL */

    case 'SET_TEMPLATE_THUMBNAIL_CALLBACK':
      return {
        ...state,
        thumbnailCallback: action.payload,
      };
    case 'CREATE_TEMPLATE_THUMBNAIL':
      if (state.thumbnailCallback) {
        state.thumbnailCallback(action.payload);
      }
      return state;

    case 'TOGGLE_SHOW_TEMPLATES_MODAL': {
      const show = !state.showTemplatesModal;
      return {
        ...state,
        showTemplatesModal: show,
        modalContentType: show ? action.contentType || null : null,
        // templates are loaded per content type: drop the previous ones,
        // otherwise the modal briefly shows them
        selectableTemplates: show
          ? initialState.selectableTemplates
          : state.selectableTemplates,
      };
    }

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
