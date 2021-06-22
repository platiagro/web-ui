// correção de bug do eslint/jsdoc
/* eslint-disable-next-line */
/* global Templates, AppStores */

/**
 * Get all templates from store
 *
 * @param {AppStores} state Redux store state
 * @returns {Templates} Templates list
 */
const getTemplates = (state) => state.Templates;

export { getTemplates };
