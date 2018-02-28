<template>
  <section class="component-layout pc-adsLayout-layout">
    <ul>
      <li v-for="item in ads" v-if="item.href">
        <a :href="item.href" :title="item.title" target="_blank">
          <img :src="item.image"/>
        </a>
        <span class="close" @click="close">×</span>
      </li>
    </ul>
  </section>
</template>

<script>
  import './index.scss';

  const Component = require('./index');
  export default new Component();
</script>
