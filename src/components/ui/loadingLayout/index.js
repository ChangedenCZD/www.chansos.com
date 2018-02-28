import BrowserUtils from '../../../utils/BrowserUtils';
import {BaseModule, mapActions, mapGetters} from '../../../lib/BaseModule';

class Component extends BaseModule {
  constructor () {
    super();
    this.setComponent({});
    this.setMethod({
      ...mapActions(['hideLoading']),
      start () {
        let self = this;
        setInterval(() => {
          self.deg = (self.deg + 15) % 360;
        }, 1000 / 24);
      },
      setSpinnerPosition () {
        this.$nextTick(() => {
          let el = this.$el.querySelector('.spinner');
          if (el) {
            let style = el.style;
            style.margin = '0px';
            style.marginLeft = `${(this.windowWidth - el.offsetWidth) / 2}px`;
            style.marginTop = `${(this.windowHeight - el.offsetHeight) / 2}px`;
          }
        });
      }
    });
    this.setCompute({
      ...mapGetters({
        windowHeight: 'windowHeight',
        windowWidth: 'windowWidth',
        loadingOptions: 'loadingOptions'
      })
    });
    this.setWatch({
      loadingOptions (options) {
        options = options || {};
        let self = this;
        let isShow = self.isShow = options.isShow || false;
        let duration = options.duration || 60000;
        let timerId = self.timerId;
        if (timerId) {
          clearTimeout(timerId);
        }
        if (isShow) {
          self.setSpinnerPosition();
          self.timerId = setTimeout(() => {
            self.hideLoading();
          }, duration);
        } else {
          self.hideLoading();
        }
      }
    });
  }

  getData () {
    return {
      supportCss3: true,
      deg: 0,
      isShow: false,
      timerId: null
    };
  }

  onCreate () {
    let app = this.app;
    app.supportCss3 = BrowserUtils.cssSupports('transform') && BrowserUtils.cssSupports('animation') && BrowserUtils.cssSupports('animationDelay');
    if (!app.supportCss3) {
      app.start();
    }
  }

  onMount () {
  }
}

module.exports = Component;
