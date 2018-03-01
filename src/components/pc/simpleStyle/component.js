import {BaseModule, mapActions, mapGetters} from '../../../lib/BaseModule';
import PcHeaderLayout from '../header';
import PcFooterLayout from '../footer';
import PcAdsLayout from '../adsLayout';
import ToastLayout from '../../ui/toastLayout';
import LoadingLayout from '../../ui/loadingLayout';

class Component extends BaseModule {
  constructor () {
    super();
    this.setProps([]);
    this.setComponent({PcHeaderLayout, PcFooterLayout, PcAdsLayout, ToastLayout, LoadingLayout});
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
