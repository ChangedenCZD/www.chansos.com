import {BaseModule, mapGetters, mapActions} from '../../../lib/BaseModule';

class Module extends BaseModule {
  constructor() {
    super();
    this.setComponent({});
    this.setMethod({
      ...mapActions([])
    });
    this.setCompute({
      ...mapGetters({
        windowWidth: 'windowWidth',
        windowHeight: 'windowHeight'
      })
    });
    this.setWatch({});
  }

  getData() {
    return {};
  }

  onCreate() {
    super.onCreate();
  }

  onMount() {
  }
}

module.exports = Module;
