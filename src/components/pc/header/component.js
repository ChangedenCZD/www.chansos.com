import {BaseModule, mapActions, mapGetters} from '../../../lib/BaseModule';
import navigation from '../../../assets/json/navigation.json';

class Component extends BaseModule {
  constructor () {
    super();
    this.setProps([]);
    this.setComponent({});
    this.setMethod({
      ...mapActions([]),
      isActive (item) {
        return (this.currentPath || this.path) === item.href ? 'active' : '';
      }
    });
    this.setCompute({
      ...mapGetters({
        windowWidth: 'windowWidth',
        windowHeight: 'windowHeight'
      }),
      path () {
        if (!this.currentPath) {
          this.currentPath = this.$route.path;
          if (this.currentPath === '/') {
            this.currentPath = '/index.html';
          }
        }
        return this.currentPath;
      }
    });
    this.setWatch({});
  }

  getData () {
    return {
      navigation,
      currentPath: ''
    };
  }

  onCreate () {
    super.onCreate();

    this.app.$nextTick(() => {
      if (this.app.$el.querySelector('.expansion-layout').offsetHeight === 0) {
        this.app.$el.querySelector('.navigation-bar-layout').classList.add('shadow-bottom');
      }
    });
  }

  onMount () {
  }
}

module.exports = Component;
