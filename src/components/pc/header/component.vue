<template>
  <section class="component-layout pc-header-layout">
    <div class="navigation-bar-layout w100 bg-white">
      <div class="navigation-bar w c-h">
        <div class="navigation-icon-layout" title="兔子人开源">
          <img class="icon" src="../../../assets/img/icon_bunny_large.png"/>
          <span class="name">兔子人开源</span>
        </div>
        <div class="navigation-area">
          <ul>
            <li v-for="item in navigation" class="clickable">
              <a :href="item.href"
                 :class="[isActive(item)]"
                 :title="item.title">{{item.title}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="expansion-layout w100">
    </div>
  </section>
</template>

<script>
  import './component.scss';

  const Component = require('./component');
  export default new Component();
</script>
