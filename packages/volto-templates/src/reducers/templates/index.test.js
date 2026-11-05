import templates, { initialState } from './index';
import { TOGGLE_SHOW_TEMPLATES_MODAL } from '../../constants/ActionTypes';

describe('templates reducer: TOGGLE_SHOW_TEMPLATES_MODAL', () => {
  it('opens the modal for the requested content type', () => {
    const result = templates(initialState, {
      type: TOGGLE_SHOW_TEMPLATES_MODAL,
      contentType: 'Event',
    });

    expect(result.showTemplatesModal).toBe(true);
    expect(result.modalContentType).toBe('Event');
  });

  it('drops the templates of the previous content type when opening', () => {
    const state = {
      ...initialState,
      selectableTemplates: {
        error: null,
        loaded: true,
        loading: false,
        items: [{ UID: 'uid-a' }],
      },
    };

    const result = templates(state, {
      type: TOGGLE_SHOW_TEMPLATES_MODAL,
      contentType: 'Event',
    });

    expect(result.selectableTemplates).toEqual(
      initialState.selectableTemplates,
    );
  });

  it('resets the content type when closing', () => {
    const state = {
      ...initialState,
      showTemplatesModal: true,
      modalContentType: 'Event',
    };

    const result = templates(state, { type: TOGGLE_SHOW_TEMPLATES_MODAL });

    expect(result.showTemplatesModal).toBe(false);
    expect(result.modalContentType).toBeNull();
  });
});
