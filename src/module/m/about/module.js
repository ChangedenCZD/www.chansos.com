import {BaseModule, mapGetters, mapActions} from '../../../lib/BaseModule';
import MSimpleStyle from '../../../components/m/simpleStyle/index.vue';

class Module extends BaseModule {
  constructor () {
    super();
    this.setComponent({MSimpleStyle});
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
    return {};
  }

  onCreate () {
    super.onCreate();
  }

  onMount () {
  }
}

module.exports = Module;
