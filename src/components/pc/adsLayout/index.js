import {BaseModule, mapActions, mapGetters} from '../../../lib/BaseModule';
import ads from '../../../assets/json/ads';

class Component extends BaseModule {
  constructor () {
    super();
    this.setProps([]);
    this.setComponent({});
    this.setMethod({
      ...mapActions([]),
      close (e) {
        e.target.offsetParent.style.display = 'none';
      }
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
      ads
    };
  }

  onCreate () {
    super.onCreate();
  }

  onMount () {
  }
}

module.exports = Component;
