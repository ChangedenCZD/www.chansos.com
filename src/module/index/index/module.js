import ToastLayout from '../../../components/ui/toastLayout/index.vue';
import LoadingLayout from '../../../components/ui/loadingLayout/index.vue';
import AlertDialog from '../../../components/ui/dialog/alert/index.vue';
import ConfirmDialog from '../../../components/ui/dialog/confirm/index.vue';
import InputDialog from '../../../components/ui/dialog/input/index.vue';
import SelectorDialog from '../../../components/ui/dialog/selector/index.vue';
import {BaseModule, mapGetters, mapActions} from '../../../lib/BaseModule';

class Module extends BaseModule {
  constructor() {
    super();
    this.setComponent({ToastLayout, LoadingLayout, AlertDialog, ConfirmDialog, InputDialog, SelectorDialog});
    this.setMethod({
      ...mapActions(['showToast', 'hideToast', 'showLoading', 'hideLoading'])
    });
    this.setCompute({
      ...mapGetters({})
    });
  }

  getData() {
    return {
      alertDialogOptions: {
        isShow: false
      },
      confirmDialogOptions: {
        isShow: false
      },
      inputDialogOptions: {
        isShow: false
      },
      selectorDialogOptions: {
        isShow: false
      }
    };
  }

  onCreate() {
    let self = this;
    let app = self.app;
    app.$nextTick(() => {
      self.Api.demo(1).then((data) => {
        console.log(data);
        app.showToast({
          content: '请求成功',
          duration: 2500
        });
        app.selectorDialogOptions = {
          isShow: true,
          title: '输入用户名',
          content: '请输入用户名。',
          selectItem: ['选项0', '选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7', '选项8', '选项9'],
          maxCount: 3,
          onHide: () => {
            app.selectorDialogOptions = {
              isShow: false
            };
          },
          onConfirm: (itemList) => {
            console.log('onConfirm', itemList);
          },
          onCancel: () => {
            console.log('onCancel');
          }
        };
      }).catch((err) => {
        console.error(err);
        app.showToast({
          content: '请求错误',
          duration: 1400
        });
        app.alertDialogOptions = {
          isShow: true,
          title: '抱歉',
          content: '请求错误。'
        };
      });
    });
  }
}

module.exports = Module;
