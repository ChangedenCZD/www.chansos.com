import {BaseModule, mapGetters, mapActions} from '../../../lib/BaseModule';
import MSimpleStyle from '../../../components/m/simpleStyle';

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
    let app = this.app;
    app.$nextTick(() => {
      app.url = app.$route.query.url;
    });
  }

  onMount () {
  }
}

module.exports = Module;
