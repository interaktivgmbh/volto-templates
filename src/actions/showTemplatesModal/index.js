import {
  GET_SHOW_TEMPLATES_MODAL,
  TOGGLE_SHOW_TEMPLATES_MODAL,
  SET_SHOW_TEMPATES_MODAL
} from '../../constants/ActionTypes'

/**
 * @template {string} N
 * @template {Record<string, unknown>} [R={}]
 * @typedef {R & { type: N }} ReduxActionObject
 */

/**
 * @returns {ReduxActionObject<typeof GET_SHOW_TEMPLATES_MODAL>}
 */
export function getShowTemplatesModal () {
  return {
    type: GET_SHOW_TEMPLATES_MODAL
  }
}

/**
 * @returns {ReduxActionObject<typeof TOGGLE_SHOW_TEMPLATES_MODAL>}
 */
export function toggleShowTemplatesModal () {
  return {
    type: TOGGLE_SHOW_TEMPLATES_MODAL
  }
}

/**
 * @template {boolean} Show
 * @param {Show} show
 * @returns {ReduxActionObject<typeof SET_SHOW_TEMPATES_MODAL, { show: Show }>}
 */
export function setShowTemplatesModal (show) {
  return {
    type: SET_SHOW_TEMPATES_MODAL,
    show
  }
}
