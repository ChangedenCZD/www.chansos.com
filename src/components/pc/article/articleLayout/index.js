import {BaseModule, mapActions, mapGetters} from '../../../../lib/BaseModule';
import * as DateUtils from '../../../../../utils/DateUtils';

class Component extends BaseModule {
  constructor () {
    super();
    this.setProps(['item']);
    this.setComponent({});
    this.setMethod({
      ...mapActions([]),
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
    this.setWatch({});
  }

  getData () {
    return {};
  }

  onCreate () {
    super.onCreate();
  }

  onMount () {
  }
}

module.exports = Component;
