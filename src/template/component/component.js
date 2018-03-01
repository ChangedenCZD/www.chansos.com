import {BaseModule, mapActions, mapGetters} from '../../lib/BaseModule';

class Component extends BaseModule {
  constructor() {
    super();
    this.setProps([]);
    this.setComponent({});
    this.setMethod({
      ...mapActions([])
    });
    this.setCompute({
      ...mapGetters({})
    });
    this.setWatch({});
  }

  getData() {
    return {};
  }

  onCreate() {
  }

  onMount() {
  }
}

module.exports = Component;
