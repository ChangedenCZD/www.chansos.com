import {BaseModule, mapGetters, mapActions} from '../../../../lib/BaseModule';
import MSimpleStyle from '../../../../components/m/simpleStyle';
import PcArticleLayout from '../../../../components/pc/article/articleLayout';

class Module extends BaseModule {
  constructor () {
    super();
    let api = this.Api;
    this.setComponent({MSimpleStyle, PcArticleLayout});
    this.setMethod({
      ...mapActions([]),
      fetchArticleList () {
        let self = this;
        api.getProjectArticleList(self.page, self.pageSize, self.keyword).then(data => {
          if (data.code === 0 && data.result) {
            self.itemList = data.result.itemList || [];
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
        this.fetchArticleList();
      },
      page () {
        this.fetchArticleList();
      }
    });
  }

  getData () {
    return {
      page: 1,
      pageSize: 5,
      keyword: '',
      itemList: []
    };
  }

  onCreate () {
    super.onCreate();
  }

  onMount () {
  }
}

module.exports = Module;
