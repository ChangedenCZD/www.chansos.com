import {BaseModule, mapActions, mapGetters} from '../../../lib/BaseModule';
import MHeaderLayout from '../header';
import MFooterLayout from '../footer';
import ToastLayout from '../../ui/toastLayout';
import LoadingLayout from '../../ui/loadingLayout';

class Component extends BaseModule {
  constructor () {
    super();
    this.setProps([]);
    this.setComponent({MHeaderLayout, MFooterLayout, ToastLayout, LoadingLayout});
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
