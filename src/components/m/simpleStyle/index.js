import {BaseModule, mapActions, mapGetters} from '../../../lib/BaseModule';
import MHeaderLayout from '../header/index.vue';
import MFooterLayout from '../footer/index.vue';
import ToastLayout from '../../ui/toastLayout/index.vue';
import LoadingLayout from '../../ui/loadingLayout/index.vue';

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
