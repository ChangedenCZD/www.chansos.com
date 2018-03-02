import {BaseModule, mapActions, mapGetters} from '../../../../lib/BaseModule';
import PcSimpleStyle from '../../simpleStyle';

class Component extends BaseModule {
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
    return {
      url: ''
    };
  }

  onCreate () {
    super.onCreate();
    let app = this.app;
    app.$nextTick(() => {
      app.url = app.$route.query.url;
    });
  }

  onMount () {
  }
}

module.exports = Component;
