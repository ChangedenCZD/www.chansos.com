import {BaseModule, mapActions, mapGetters} from '../../../../lib/BaseModule';
import MSimpleStyle from '../../simpleStyle';

class Component extends BaseModule {
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

module.exports = Component;
