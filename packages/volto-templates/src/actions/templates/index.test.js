import { getSelectableTemplates, toggleShowTemplatesModal } from './index';
import {
  GET_SELECTABLE_TEMPLATES,
  TOGGLE_SHOW_TEMPLATES_MODAL,
} from '../../constants/ActionTypes';

describe('getSelectableTemplates', () => {
  it('searches templates released for the content type', () => {
    const result = getSelectableTemplates('News Item');

    expect(result.type).toBe(GET_SELECTABLE_TEMPLATES);
    expect(result.request.path).toContain('portal_type=Template');
    expect(result.request.path).toContain('template_types=News%20Item');
  });
});

describe('toggleShowTemplatesModal', () => {
  it('carries the content type', () => {
    const result = toggleShowTemplatesModal('Event');

    expect(result).toEqual({
      type: TOGGLE_SHOW_TEMPLATES_MODAL,
      contentType: 'Event',
    });
  });

  it('has no content type without argument', () => {
    const result = toggleShowTemplatesModal();

    expect(result.contentType).toBeNull();
  });
});
