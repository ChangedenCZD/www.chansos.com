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
        this.selectItem = options.selectItem || [];
        this.maxCount = Math.max(1, options.maxCount || 1);
        let autoDismiss = options.autoDismiss;
        this.autoDismiss = typeof autoDismiss === 'boolean' ? autoDismiss : true;
        this.maxHeight = this.windowHeight * 0.44;
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
        let itemList = this.itemList || {};
        let selected = Object.keys(itemList).filter((item) => {
          return !!itemList[item];
        });
        if (selected.length < 1) {
          this.selectWarnMessage = '至少选择一个选项';
        } else {
          this.selectWarnMessage = '';
          let onConfirm = this.onConfirm;
          typeof onConfirm === 'function' && onConfirm(selected);
          this.tryToHide();
        }
      },
      tryToHide() {
        if (this.autoDismiss) {
          this.hide();
        }
      },
      onSelected(index) {
        let itemList = this.itemList || {};
        let maxCount = this.maxCount;
        if (maxCount < 2) {
          itemList[index] = true;
          this.itemList = itemList;
          this.confirm();
        } else {
          let selected = Object.keys(itemList).filter((item) => {
            return !!itemList[item];
          });
          let currentStatus = itemList[index];
          if (selected.length < maxCount || currentStatus) {
            itemList[index] = !currentStatus;
            this.itemList = itemList;
            this.selectItem = this.selectItem.concat();
          }
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
      selectItem: [],
      maxCount: 1,
      maxHeight: 'auto',
      itemList: {},
      selectWarnMessage: ''
    };
  }

  onCreate() {
    this.app.setOptions();
  }

  onMount() {
  }
}

module.exports = Component;
