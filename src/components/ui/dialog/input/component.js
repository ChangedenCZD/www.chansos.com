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
        this.inputContent = options.defaultValue || '';
        this.inputHint = options.inputHint || '';
        let minLength = Math.max(0, options.minLength || 0);
        let maxLength = Math.min(140, options.maxLength || 140);
        if (minLength > maxLength) {
          minLength = maxLength;
        }
        this.minLength = minLength;
        this.maxLength = maxLength;
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
        let maxLength = this.maxLength;
        let minLength = this.minLength;
        let inputContent = this.inputContent || '';
        let inputContentLength = inputContent.length;
        if (inputContentLength < minLength) {
          this.inputWarnMessage = `内容不得小于${minLength}位`;
        } else if (inputContentLength > maxLength) {
          this.inputWarnMessage = `内容不得多于${maxLength}位`;
        } else {
          this.inputWarnMessage = '';
          let onConfirm = this.onConfirm;
          typeof onConfirm === 'function' && onConfirm(inputContent);
          this.tryToHide();
        }
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
      autoDismiss: true,
      maxLength: 140,
      minLength: 0,
      inputHint: '',
      inputContent: '',
      inputWarnMessage: ''
    };
  }

  onCreate() {
    this.app.setOptions();
  }

  onMount() {
  }
}

module.exports = Component;
