import {BaseModule, mapActions, mapGetters} from '../../../lib/BaseModule';

class Component extends BaseModule {
  constructor () {
    super();
    this.setComponent({});
    this.setMethod({
      ...mapActions(['hideToast']),
      setContentLayoutSize () {
        this.$nextTick(() => {
          let el = this.$el.querySelector('.content');
          if (el) {
            let style = el.style;
            style.marginLeft = `${(this.windowWidth - el.offsetWidth) / 2}px`;
          }
        });
      }
    });
    this.setCompute({
      ...mapGetters({
        windowHeight: 'windowHeight',
        windowWidth: 'windowWidth',
        toastOptions: 'toastOptions'
      })
    });
    this.setWatch({
      toastOptions (options) {
        options = options || {};
        let self = this;
        let isShow = self.isShow = options.isShow || false;
        let duration = options.duration || 618;
        self.content = options.content || '';
        let timerId = self.timerId;
        if (timerId) {
          clearTimeout(timerId);
        }
        if (isShow) {
          self.setContentLayoutSize();
          self.timerId = setTimeout(() => {
            self.hideToast();
          }, duration);
        } else {
          self.hideToast();
        }
      }
    });
  }

  getData () {
    return {
      isShow: false,
      content: '',
      timerId: null
    };
  }

  onCreate () {
  }

  onMount () {
  }
}

module.exports = Component;
