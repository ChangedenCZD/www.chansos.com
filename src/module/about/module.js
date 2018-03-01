import {BaseModule, mapGetters, mapActions} from '../../lib/BaseModule';
import PcSimpleStyle from '../../components/pc/simpleStyle';

class Module extends BaseModule {
  constructor () {
    super();
    this.setComponent({PcSimpleStyle});
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
