import {BaseModule, mapActions, mapGetters} from '../../lib/BaseModule';
import {os} from '../../utils/BrowserUtils';

class Component extends BaseModule {
  constructor() {
    super();
    this.setProps([]);
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
    return {
      isPc: os.isPc
    };
  }

  onCreate() {
  }

  onMount() {
  }
}

module.exports = Component;
