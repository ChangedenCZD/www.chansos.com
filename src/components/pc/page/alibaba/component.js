import {BaseModule, mapActions, mapGetters} from '../../../../lib/BaseModule';
import * as DateUtils from '../../../../../utils/DateUtils';
import PcSimpleStyle from '../../simpleStyle';
import PcAlibabaSearchBar from '../../alibaba/searchBar';

class Component extends BaseModule {
  constructor () {
    super();
    let api = this.Api;
    this.setComponent({PcSimpleStyle, PcAlibabaSearchBar});
    this.setMethod({
      ...mapActions([]),
      fetchKeywordList () {
        let self = this;
        api.alibabaCouponKeywordList(5).then(data => {
          if (data.code === 0 && data.result) {
            self.keywordList = data.result.itemList || [];
            self.setAlibabaSearchBarOptions();
            self.search();
          } else {
            throw new Error(data.message);
          }
        }).catch(err => {
          self.setAlibabaSearchBarOptions();
          console.error(err);
        });
      },
      setAlibabaSearchBarOptions () {
        let self = this;
        self.alibabaSearchBarOptions = {
          keywordList: self.keywordList,
          onKeywordChanged: self.onKeywordChanged,
          onSearch: self.search
        };
      },
      search (keyword) {
        let self = this;
        keyword = keyword || (self.keywordList[0] && self.keywordList[0].keyword) || '电脑';
        self.fetchJhsProductList(keyword);
      },
      fetchJhsProductList (keyword) {
        let self = this;
        api.alibabaJhsProductList(1, self.maxCount * 2, keyword).then(data => {
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
        api.alibabaCouponList(1, self.maxCount * 2, keyword).then(data => {
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
      onKeywordChanged (keyword) {
      },
      setProductWidth () {
        this.$nextTick(() => {
          let parent = this.$el.querySelector('.alibaba-product-list');
          if (parent) {
            let maxWidth = parent.offsetWidth;
            let length = Math.min(Math.max(this.couponList.length, this.jhsProductList.length), this.maxCount);
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
        this.maxCount = value > 720 ? 5 : 4;
        this.fetchKeywordList();
      }
    });
  }

  getData () {
    return {
      keyword: '',
      keywordList: [],
      alibabaSearchBarOptions: {
        keywordList: []
      },
      maxCount: 4,
      jhsProductList: [],
      couponList: [],
      productWidth: 'auto'
    };
  }

  onCreate () {
    super.onCreate();
  }

  onMount () {
  }
}

module.exports = Component;
