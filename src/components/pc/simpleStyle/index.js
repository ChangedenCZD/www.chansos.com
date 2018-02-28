import {BaseModule, mapActions, mapGetters} from '../../../lib/BaseModule';
import PcHeaderLayout from '../header/index.vue';
import PcFooterLayout from '../footer/index.vue';
import PcAdsLayout from '../adsLayout/index.vue';
import ToastLayout from '../../ui/toastLayout/index.vue';
import LoadingLayout from '../../ui/loadingLayout/index.vue';

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
