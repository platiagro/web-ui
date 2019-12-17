import { uploadDataSet as uploadDatasetService } from '../../services/dataSetApi';

/**
 * Actions for Drawer
 */

// ACTION TYPES
// MAIN DRAWER
export const SHOW_DRAWER = 'SHOW_DRAWER';
export const HIDE_DRAWER = 'HIDE_DRAWER';
export const SELECT_DRAWER = 'SELECT_DRAWER';
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';
// export const SHOW_DRAWER_RESULT = 'SHOW_DRAWER_RESULT';
// export const HIDE_DRAWER_RESULT = 'HIDE_DRAWER_RESULT';

// DATASET DRAWER
export const UPLOAD_DATASET = 'UPLOAD_DATASET';

// DISPATCHS
// MAIN DRAWER
/**
 * Dispatch to show drawer
 */
export const showDrawer = () => ({
  type: SHOW_DRAWER,
  visible: true,
});

/**
 * Dispatch to hide drawer
 */
export const hideDrawer = () => ({
  type: HIDE_DRAWER,
  visible: false,
});

/**
 * Dispatch to select drawer content
 * @param {Object} drawerContent - drawer content object
 */
export const selectDrawer = (drawerContent) => ({
  type: SELECT_DRAWER,
  title: drawerContent.title,
  children: drawerContent.children,
});

/**
 * Dispatch to show loader (start loading)
 */
export const showLoader = () => ({
  type: START_LOADING,
  loading: true,
});

/**
 * Dispatch to hide loader (end loading)
 */
export const hideLoader = () => ({
  type: END_LOADING,
  loading: false,
});

// DATASET DRAWER
/**
 * Dispatch to upload dataset success
 */
export const uploadDatasetSuccess = (dataset) => ({
  type: UPLOAD_DATASET,
  dataset,
});

/**
 * Async action to upload dataset with loading
 */
export const uploadDataset = (form) => {
  return (dispatch) => {
    dispatch(showLoader());

    return uploadDatasetService(form)
      .then((response) => {
        dispatch(uploadDatasetSuccess(response.data));
      })
      .finally(() => dispatch(hideLoader()));
  };
};
