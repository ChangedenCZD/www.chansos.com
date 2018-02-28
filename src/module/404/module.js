import {BaseModule, mapGetters, mapActions} from '../../lib/BaseModule';
import PcSimpleStyle from '../../components/pc/simpleStyle/index.vue';

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

module.exports = Module;
