import {
    GET_SELECTABLE_TEMPLATES,
    SET_TEMPLATE_THUMBNAIL_CALLBACK,
    TOGGLE_SHOW_TEMPLATES_MODAL,
    TRIGGER_TEMPLATE_THUMBNAIL
} from "../../constants/ActionTypes";

export function getSelectableTemplates() {
    const path = '/@search';

    return {
        type: GET_SELECTABLE_TEMPLATES,
        request: {
            op: 'get',
            path: `/@search?portal_type=Template&metadata_fields=UID&metadata_fields=template_description&metadata_fields=template_thumbnail`,
        },
    };
}

export function toggleShowTemplatesModal() {
    return {
        type: TOGGLE_SHOW_TEMPLATES_MODAL
    }
}

export function setThumbnailCallback(callback) {
    return {
        type: SET_TEMPLATE_THUMBNAIL_CALLBACK,
        payload: callback,
    }
}

export function createThumbnail(url) {
    return {
        type: TRIGGER_TEMPLATE_THUMBNAIL,
        payload: url,
    }
}
