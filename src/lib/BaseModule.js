import Context from './Context';
import {mapActions, mapGetters} from 'vuex';
import {initApp} from '../utils/BrowserUtils';

class BaseModule extends Context {
  constructor() {
    super();
    let self = this;
    this.app = null;
    this.data = function () {
      return self.getData();
    };
    this.created = function () {
      self.onCreate(self.app = this);
    };
    this.mounted = function () {
      self.onMount(self.app = this);
    };
    this.updated = function () {
      self.onUpdate(self.app = this);
    };
    this.watch = {};
    this.methods = {};
    this.components = {};
    this.computed = {};
    this.props = [];
  }

  setProps(props) {
    this.props = props;
  }

  getData() {
    return {};
  }

  onCreate() {
    initApp(this.app);
  }

  onMount() {
  }

  onUpdate() {
  }

  setWatch(options) {
    this.watch = options || {};
  }

  setMethod(options) {
    this.methods = options || {};
  }

  setComponent(options) {
    this.components = options || {};
  }

  setCompute(options) {
    this.computed = options || {};
  }
}

module.exports = {
  BaseModule, mapActions, mapGetters
};
