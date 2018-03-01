import {BaseModule, mapActions, mapGetters} from '../../../lib/BaseModule';
import footer from '../../../assets/json/footer';

class Component extends BaseModule {
  constructor () {
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

  getData () {
    return {
      footer
    };
  }

  onCreate () {
    super.onCreate();
  }

  onMount () {
  }
}

module.exports = Component;
