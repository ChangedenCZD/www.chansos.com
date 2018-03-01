import {BaseModule, mapActions, mapGetters} from '../../../../lib/BaseModule';
import AlertDialog from '../../../ui/dialog/alert';
import {checkEmail, checkLength, checkUrl} from '../../../../../utils/TextUtils';

class Component extends BaseModule {
  constructor () {
    super();
    let api = this.Api;
    this.setProps([]);
    this.setComponent({AlertDialog});
    this.setMethod({
      ...mapActions(['hideAddWebsite', 'showToast']),
      submit () {
        let self = this;
        let title = self.title || '';
        let website = self.website || '';
        if (!(website.startsWith('http://') || website.startsWith('https://'))) {
          website = `http://${website}`;
          this.website = website;
        }
        let email = self.email || '';
        if (!checkLength(title, 2, 14)) {
          self.showToast({
            content: '网站名称应为2～14位'
          });
        } else if (!checkLength(website, 2, 100)) {
          self.showToast({
            content: '网址应为2～100位'
          });
        } else if (!checkUrl(website)) {
          self.showToast({
            content: '网址格式错误'
          });
        } else if (!checkEmail(email)) {
          self.showToast({
            content: '联系邮箱格式错误'
          });
        } else {
          api.addWebsite(title, website, email, 0).then(data => {
            if (data.code === 0) {
              self.alertDialogOptions = {
                isShow: true,
                title: '恭喜',
                content: '网站提交成功，请等待审核。',
                onHide: () => {
                  self.alertDialogOptions = {isShow: false};
                  self.hideAddWebsite();
                }
              };
            } else {
              throw new Error(data.message);
            }
          }).catch(err => {
            console.error(err);
            self.alertDialogOptions = {
              isShow: true,
              title: '抱歉',
              content: err.message,
              onHide: () => {
                self.alertDialogOptions = {isShow: false};
              }
            };
          });
        }
      }
    });
    this.setCompute({
      ...mapGetters({
        windowWidth: 'windowWidth',
        windowHeight: 'windowHeight',
        isShowAddWebsite: 'isShowAddWebsite'
      })
    });
    this.setWatch({
      isShowAddWebsite (value) {
        if (value) {
          this.$nextTick(() => {
            let el = this.$el.querySelector('.add-website-layout');
            if (el) {
              this.left = (this.windowWidth - el.offsetWidth) / 2;
              this.top = (this.windowHeight - el.offsetHeight) / 2;
            }
          });
        }
      }
    });
  }

  getData () {
    return {
      left: 'auto',
      top: 'auto',
      title: '',
      website: '',
      email: '',
      alertDialogOptions: {isShow: false}
    };
  }

  onCreate () {
    super.onCreate();
  }

  onMount () {
  }
}

module.exports = Component;
