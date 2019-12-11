/**
 * Actions for Drawer
 */

// ACTION TYPES
export const SHOW_DRAWER = 'SHOW_DRAWER';
export const HIDE_DRAWER = 'HIDE_DRAWER';
// export const SELECT_DRAWER = 'SELECT_DRAWER';
// export const SHOW_DRAWER_RESULT = 'SHOW_DRAWER_RESULT';
// export const HIDE_DRAWER_RESULT = 'HIDE_DRAWER_RESULT';

// ACTION FUNCTIONS
/**
 * Action function to show drawer
 */
export const showDrawer = () => ({
  type: SHOW_DRAWER,
  visible: true,
});

/**
 * Action function to hide drawer
 */
export const hideDrawer = () => ({
  type: HIDE_DRAWER,
  visible: false,
});
