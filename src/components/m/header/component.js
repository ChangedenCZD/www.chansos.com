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
          this.currentPath = this.$route.path.replace(/\/m/, '');
          if (this.currentPath === '/') {
            this.currentPath = '/index.html';
          }
        }
        return this.currentPath;
      },
      title () {
        let title = '';
        let self = this;
        self.navigation.forEach((item) => {
          if (self.path === item.href) {
            title = item.title;
          }
        });
        if (!title) {
          switch (self.path) {
            case '/alibaba/taobaoke.html':
              title = '淘宝客';
              break;
            case '/alibaba/juhuasuan.html':
              title = '聚划算';
              break;
            case '/alibaba/coupon.html':
              title = '优惠券';
              break;
            case '/article/project.html':
              title = '项目';
              break;
            case '/article/toutiao.html':
              title = '头条号';
              break;
            case '/article/gongzhonghao.html':
              title = '公众号';
              break;
          }
        }
        return title;
      }
    });
    this.setWatch({});
  }

  getData () {
    return {
      navigation,
      isShowMenu: false
    };
  }

  onCreate () {
    super.onCreate();
  }

  onMount () {
  }
}

module.exports = Component;
