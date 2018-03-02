import {BaseModule, mapGetters, mapActions} from '../../lib/BaseModule';
import Bootstrap from '../../components/bootstrap';
import PcLayout from '../../components/pc/page/alibaba';
import MLayout from '../../components/m/page/alibaba';

class Module extends BaseModule {
  constructor() {
    super();
    this.setComponent({Bootstrap, PcLayout, MLayout});
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
