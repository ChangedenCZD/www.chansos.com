import {BaseModule, mapActions, mapGetters} from '../../../../lib/BaseModule';
import AddWebsiteLayout from '../../website/addWebsiteLayout';
import PcSimpleStyle from '../../simpleStyle';

class Component extends BaseModule {
  constructor() {
    super();
    let api = this.Api;
    this.setComponent({PcSimpleStyle, AddWebsiteLayout});
    this.setMethod({
      ...mapActions(['showLoading', 'showToast', 'showAddWebsite']),
      fetchWebsiteTypeList() {
        let self = this;
        api.websiteTypeList().then(data => {
          if (data.code === 0 && data.result) {
            self.typeList = (data.result.itemList || []).sort(left => {
              return left.type === 0;
            });
            self.fetchWebsiteListForIndex(0);
          } else {
            throw new Error(data.message);
          }
        }).catch(err => {
          console.error(err);
        });
      },
      fetchWebsiteListForIndex(index) {
        let self = this;
        let typeList = self.typeList || [];
        let length = typeList.length;
        if (index < length) {
          self.fetchWebsiteList(typeList[index].type).then(() => {
            self.typeList = typeList.concat();
            self.fetchWebsiteListForIndex(index + 1);
          });
        }
      },
      fetchWebsiteList(type) {
        let self = this;
        return new Promise(resolve => {
          api.websiteList(type).then(data => {
            if (data.code === 0 && data.result) {
              self.websiteList[type] = data.result.itemList;
              resolve();
            } else {
              throw new Error(data.message);
            }
          }).catch(err => {
            console.error(err);
            resolve();
          });
        });
      },
      en(url) {
        return `${url}${url.indexOf('?') < 0 ? '?' : '&'}returnUrl=${encodeURIComponent(window.location.origin)}`;
      }
    });
    this.setCompute({
      ...mapGetters({
        windowWidth: 'windowWidth',
        windowHeight: 'windowHeight'
      })
    });
    this.setWatch({
      windowWidth() {
        this.fetchWebsiteTypeList();
      }
    });
  }

  getData() {
    return {
      typeList: [],
      websiteList: {}
    };
  }

  onCreate() {
    super.onCreate();
  }

  onMount() {
  }
}

module.exports = Component;
