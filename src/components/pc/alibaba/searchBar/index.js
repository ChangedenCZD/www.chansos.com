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
        this.keywordList = options.keywordList || [];
        this.keyword = (this.keywordList[0] && this.keywordList[0].keyword) || '电脑';
        this.onSearch = options.onSearch;
      },
      submit () {
        typeof this.onSearch === 'function' && this.onSearch(this.keyword);
      }
    });
    this.setCompute({
      ...mapGetters({
        windowWidth: 'windowWidth',
        windowHeight: 'windowHeight'
      })
    });
    this.setWatch({
      options () {
        this.setOptions();
      },
      keyword (value) {
        typeof this.onKeywordChanged === 'function' && this.onKeywordChanged(value);
      }
    });
  }

  getData () {
    return {
      keyword: '',
      keywordList: []
    };
  }

  onCreate () {
    super.onCreate();
    this.app.$nextTick(() => {
      this.app.setOptions();
    });
  }

  onMount () {
  }
}

module.exports = Component;
