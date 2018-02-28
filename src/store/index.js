import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import * as types from './mutation-types';
import {clone} from '../utils/ObjectSupport';

const TOAST_DEFAULT_OPTIONS = {
  isShow: false,
  content: '请稍等...',
  duration: 1000
};
const LOADING_DEFAULT_OPTIONS = {
  isShow: false,
  duration: 60000
};
const WINDOW_DEFAULT_SIZE = {
  height: 400,
  width: 400
};
Vue.use(Vuex);
let state = {
  // insert state
  toastOptions: TOAST_DEFAULT_OPTIONS,
  loadingOptions: LOADING_DEFAULT_OPTIONS,
  windowSize: WINDOW_DEFAULT_SIZE,
  website: {
    isShowAdd: false
  }
};
let mutations = {
  // insert mutation
  [types.SHOW_TOAST] (state, options) {
    let defaultOptions = options || clone(TOAST_DEFAULT_OPTIONS);
    defaultOptions.isShow = true;
    state.toastOptions = defaultOptions;
  },
  [types.HIDE_TOAST] (state) {
    state.toastOptions = TOAST_DEFAULT_OPTIONS;
  },
  [types.SHOW_LOADING] (state, options) {
    let defaultOptions = options || clone(LOADING_DEFAULT_OPTIONS);
    defaultOptions.isShow = true;
    state.loadingOptions = defaultOptions;
  },
  [types.HIDE_LOADING] (state) {
    state.loadingOptions = LOADING_DEFAULT_OPTIONS;
  },
  [types.SET_WINDOW_SIZE] (state, size) {
    state.windowSize = size || WINDOW_DEFAULT_SIZE;
  },
  [types.SHOW_ADD_WEBSITE] (state) {
    state.website.isShowAdd = true;
  },
  [types.HIDE_ADD_WEBSITE] (state) {
    state.website.isShowAdd = false;
  }
};
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
});
