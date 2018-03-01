import {BaseModule, mapGetters, mapActions} from '../../lib/BaseModule';
import PcSimpleStyle from '../../components/pc/simpleStyle';
import PcArticleLayout from '../../components/pc/article/articleLayout';
import * as DateUtils from '../../../utils/DateUtils';

class Module extends BaseModule {
  constructor () {
    super();
    let api = this.Api;
    this.setComponent({PcSimpleStyle, PcArticleLayout});
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
      },
      fetchJhsProductList (keyword) {
        let self = this;
        api.alibabaJhsProductList(self.page, self.maxCount, keyword).then(data => {
          if (data.code === 0 && data.result) {
            self.fetchCouponList(keyword);
            self.jhsProductList = data.result.itemList || [];
            self.setProductWidth();
          } else {
            throw new Error(data.message);
          }
        }).catch(err => {
          console.error(err);
          self.fetchCouponList(keyword);
        });
      },
      fetchCouponList (keyword) {
        let self = this;
        api.alibabaCouponList(self.page, self.maxCount, keyword).then(data => {
          if (data.code === 0 && data.result) {
            self.couponList = data.result.itemList || [];
            self.setProductWidth();
          } else {
            throw new Error(data.message);
          }
        }).catch(err => {
          console.error(err);
        });
      },
      setProductWidth () {
        this.$nextTick(() => {
          let parent = this.$el.querySelector('.alibaba-product-list');
          if (parent) {
            let maxWidth = parent.offsetWidth;
            let length = this.maxCount;
            this.productWidth = (maxWidth - (length + 1) * 10 * window.remScale) / length;
          }
        });
      },
      format (time) {
        return DateUtils.format(time, 'yyyy-mm-dd HH:MM:ss');
      }
    });
    this.setCompute({
      ...mapGetters({
        windowWidth: 'windowWidth',
        windowHeight: 'windowHeight'
      })
    });
    this.setWatch({
      windowWidth (value) {
        this.fetchProjectList();
        this.maxCount = value > 720 ? 5 : 4;
        this.fetchJhsProductList('电脑');
      }
    });
  }

  getData () {
    return {
      page: 1,
      pageSize: 2,
      maxCount: 4,
      keyword: '',
      jhsProductList: [],
      couponList: [],
      projectList: [],
      toutiaoList: [],
      gongzhonghaoList: [],
      productWidth: 'auto'
    };
  }

  onCreate () {
    super.onCreate();
  }

  onMount () {
  }
}

module.exports = Module;
