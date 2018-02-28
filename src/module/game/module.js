import {BaseModule, mapGetters, mapActions} from '../../lib/BaseModule';

class Module extends BaseModule {
  constructor () {
    super();
    this.setComponent({});
    this.setMethod({
      ...mapActions([])
    });
    this.setCompute({
      ...mapGetters({
        windowWidth: 'windowWidth',
        windowHeight: 'windowHeight'
      })
    });
    this.setWatch({
      windowWidth (value) {
        let rem10 = window.remScale * 10;
        let realWidth = value - rem10;
        let itemMinWidth = 320 + rem10 * 2;
        let maxCount = parseInt(realWidth / itemMinWidth) || 1;
        this.itemSize = (realWidth - rem10 * maxCount) / maxCount;
      }
    });
  }

  getData () {
    return {
      gameList: [
        {
          name: '天黑请闭眼',
          href: '/game/killer.html'
        },
        {
          name: '狼人杀',
          href: '/game/wereWolves.html'
        }
      ],
      itemSize: 'auto'
    };
  }

  onCreate () {
    super.onCreate();
  }

  onMount () {
  }
}

module.exports = Module;
