import {BaseModule, mapActions, mapGetters} from '../../../../lib/BaseModule';
import PcArticleLayout from '../../../pc/article/articleLayout';
import MSimpleStyle from '../../simpleStyle';

class Component extends BaseModule {
  constructor () {
    super();
    let api = this.Api;
    this.setComponent({MSimpleStyle, PcArticleLayout});
    this.setMethod({
      ...mapActions([]),
      fetchProjectList () {
        let self = this;
        api.getProjectArticleList(self.page, self.pageSize, self.keyword).then(data => {
          if (data.code === 0 && data.result) {
            self.fetchToutiaoList();
            self.projectList = data.result.itemList || [];
          } else {
            throw new Error(data.message);
          }
        }).catch(err => {
          self.fetchToutiaoList();
          console.error(err);
        });
      },
      fetchToutiaoList () {
        let self = this;
        api.getToutiaoArticleList(self.page, self.pageSize, self.keyword).then(data => {
          if (data.code === 0 && data.result) {
            self.fetchGongzhonghaoList();
            self.toutiaoList = data.result.itemList || [];
          } else {
            throw new Error(data.message);
          }
        }).catch(err => {
          self.fetchGongzhonghaoList();
          console.error(err);
        });
      },
      fetchGongzhonghaoList () {
        let self = this;
        api.getGongzhonghaoArticleList(self.page, self.pageSize, self.keyword).then(data => {
          if (data.code === 0 && data.result) {
            self.gongzhonghaoList = data.result.itemList || [];
          } else {
            throw new Error(data.message);
          }
        }).catch(err => {
          console.error(err);
        });
      }
    });
    this.setCompute({
      ...mapGetters({
        windowWidth: 'windowWidth',
        windowHeight: 'windowHeight'
      })
    });
    this.setWatch({
      windowWidth () {
        this.fetchProjectList();
      }
    });
  }

  getData () {
    return {
      page: 1,
      pageSize: 3,
      keyword: '',
      projectList: [],
      toutiaoList: [],
      gongzhonghaoList: []
    };
  }

  onCreate () {
    super.onCreate();
  }

  onMount () {
  }
}

module.exports = Component;
