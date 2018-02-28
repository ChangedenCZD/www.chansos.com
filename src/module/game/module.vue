<template>
  <section class="main-layout game-layout">
    <ul class="game-list pdt10">
      <li class="game-item"
          v-for="item in gameList">
        <a class="clickable shadow mgl10 mgb10 pd20"
           :style="{width:itemSize+'px'}"
           :href="item.href">{{item.name}}</a>
      </li>
    </ul>
  </section>
</template>

<script>
  import './module.scss';

  const Module = require('./module');
  export default new Module();
</script>
