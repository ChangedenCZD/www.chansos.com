import {BaseModule, mapActions, mapGetters} from '../../../../lib/BaseModule';

class Component extends BaseModule {
  constructor () {
    super();
    this.setProps(['options']);
    this.setComponent({});
    this.setMethod({
      ...mapActions([]),
      setOptions () {
        let options = this.options || {};
        this.isShow = !!options.isShow;
        this.title = options.title || '';
        this.content = options.content || '';
        this.onHide = options.onHide || null;
        this.$nextTick(() => {
          let el = this.$el.querySelector('.dialog-area');
          if (el) {
            el.style.marginTop = `${(this.windowHeight - el.offsetHeight) / 2}px`;
            el.style.marginLeft = `${(this.windowWidth - el.offsetWidth) / 2}px`;
          }
        });
      },
      hide () {
        let onHide = this.onHide;
        typeof onHide === 'function' && onHide();
      }
    });
    this.setCompute({
      ...mapGetters({
        windowHeight: 'windowHeight',
        windowWidth: 'windowWidth'
      })
    });
    this.setWatch({
      options () {
        this.setOptions();
      }
    });
  }

  getData () {
    return {
      isShow: false,
      title: '',
      content: '',
      onHide: null
    };
  }

  onCreate () {
    this.app.setOptions();
  }

  onMount () {
  }
}

module.exports = Component;
