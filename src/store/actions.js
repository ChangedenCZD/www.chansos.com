import * as types from './mutation-types';

export const showToast = ({commit}, options) => {
  commit(types.SHOW_TOAST, options);
};
export const hideToast = ({commit}) => {
  commit(types.HIDE_TOAST);
};
export const setWindowSize = ({commit}, size) => {
  commit(types.SET_WINDOW_SIZE, size);
};
export const showLoading = ({commit}, options) => {
  commit(types.SHOW_LOADING, options);
};
export const hideLoading = ({commit}) => {
  commit(types.HIDE_LOADING);
};
export const showAddWebsite = ({commit}) => {
  commit(types.SHOW_ADD_WEBSITE);
};
export const hideAddWebsite = ({commit}) => {
  commit(types.HIDE_ADD_WEBSITE);
};
// insert action
