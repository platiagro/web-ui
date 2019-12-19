/**
 * Actions for Drawer
 */

// ACTION TYPES
// MAIN DRAWER
export const DRAWER_SHOW_DRAWER = 'DRAWER_SHOW_DRAWER';
export const DRAWER_HIDE_DRAWER = 'DRAWER_HIDE_DRAWER';
export const DRAWER_SELECT_DRAWER = 'DRAWER_SELECT_DRAWER';
export const DRAWER_START_LOADING = 'DRAWER_START_LOADING';
export const DRAWER_END_LOADING = 'DRAWER_END_LOADING';
// export const SHOW_DRAWER_RESULT = 'SHOW_DRAWER_RESULT';
// export const HIDE_DRAWER_RESULT = 'HIDE_DRAWER_RESULT';

// DISPATCHS
// MAIN DRAWER
/**
 * Dispatch to show drawer
 */
export const showDrawer = () => ({
  type: DRAWER_SHOW_DRAWER,
  visible: true,
});

/**
 * Dispatch to hide drawer
 */
export const hideDrawer = () => ({
  type: DRAWER_HIDE_DRAWER,
  visible: false,
});

/**
 * Dispatch to select drawer content
 * @param {Object} drawerContent - drawer content object
 */
export const selectDrawer = (drawerContent) => ({
  type: DRAWER_SELECT_DRAWER,
  title: drawerContent.title,
  children: drawerContent.children,
});

/**
 * Dispatch to show loader (start loading)
 */
export const showLoader = () => ({
  type: DRAWER_START_LOADING,
  loading: true,
});

/**
 * Dispatch to hide loader (end loading)
 */
export const hideLoader = () => ({
  type: DRAWER_END_LOADING,
  loading: false,
});
