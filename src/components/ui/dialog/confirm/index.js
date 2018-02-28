import {BaseModule, mapActions, mapGetters} from '../../../../lib/BaseModule';

class Component extends BaseModule {
  constructor() {
    super();
    this.setProps(['options']);
    this.setComponent({});
    this.setMethod({
      ...mapActions([]),
      setOptions() {
        let options = this.options || {};
        this.isShow = !!options.isShow;
        this.title = options.title || '';
        this.content = options.content || '';
        this.onHide = options.onHide || null;
        this.onCancel = options.onCancel || null;
        this.onConfirm = options.onConfirm || null;
        let autoDismiss = options.autoDismiss;
        this.autoDismiss = typeof autoDismiss === 'boolean' ? autoDismiss : true;
        this.$nextTick(() => {
          let el = this.$el.querySelector('.dialog-area');
          if (el) {
            el.style.marginTop = `${(this.windowHeight - el.offsetHeight) / 2}px`;
            el.style.marginLeft = `${(this.windowWidth - el.offsetWidth) / 2}px`;
          }
        });
      },
      hide() {
        let onHide = this.onHide;
        typeof onHide === 'function' && onHide();
      },
      cancel() {
        let onCancel = this.onCancel;
        typeof onCancel === 'function' && onCancel();
        this.tryToHide();
      },
      confirm() {
        let onConfirm = this.onConfirm;
        typeof onConfirm === 'function' && onConfirm();
        this.tryToHide();
      },
      tryToHide() {
        if (this.autoDismiss) {
          this.hide();
        }
      }
    });
    this.setCompute({
      ...mapGetters({
        windowHeight: 'windowHeight',
        windowWidth: 'windowWidth'
      })
    });
    this.setWatch({
      options() {
        this.setOptions();
      }
    });
  }

  getData() {
    return {
      isShow: false,
      title: '',
      content: '',
      onHide: null,
      onCancel: null,
      onConfirm: null,
      autoDismiss: true
    };
  }

  onCreate() {
    this.app.setOptions();
  }

  onMount() {
  }
}

module.exports = Component;
