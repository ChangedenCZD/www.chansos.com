<template>
  <section class="component-layout ui-loadingLayout-layout fix lt0 w100 h100"
           :style="{height:windowHeight+'px',width:windowWidth+'px'}"
           v-show="isShow">
    <div class="spinner" v-if="supportCss3">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
    <div class="spinner" v-else>
      <img id="loadingImage" :class="['t'+deg]" src="https://image.chansos.com/static/loading_icon.png"/>
    </div>
  </section>
</template>

<script>
  import './component.scss';

  const Component = require('./component');
  export default new Component();
</script>
