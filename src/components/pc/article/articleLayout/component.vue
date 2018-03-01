<template>
  <li class="component-layout article-articleLayout-layout shadow clickable mgb10 pd15" v-if="item">
    <a :href="item.href" target="_blank" :title="item.title">
      <h3 class="article-title fs-large mgb15 mgt5" v-if="item.title">{{item.title}}</h3>
      <p class="article-image mgb10" v-if="item.image">
        <img class="" :src="item.image"/>
      </p>
      <p class="fs-normal mgb10" v-if="item.description">{{item.description}}</p>
      <p class="fs-mini text-gray mgb10" v-if="item.ref||item.lang">
        <span v-if="item.ref">来源：{{item.ref === 'source' ? '站内项目' : '站外大牛'}}</span>
        <span class="fs-mini text-gray mgb10" v-if="item.lang">语言：{{item.lang}}</span>
      </p>
      <p class="fs-mini text-gray" v-if="item.update_at">最后更新：{{format(item.update_at)}}</p>
    </a>
  </li>
</template>

<script>
  import './component.scss';

  const Component = require('./component');
  export default new Component();
</script>
