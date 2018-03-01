<template>
  <section class="component-layout ui-toastLayout-layout fix lt0 w100 h100"
           :style="{height:windowHeight+'px',width:windowWidth+'px'}"
           v-show="isShow">
    <div class="content fix lb0 pd10 pdl20 pdr20">
      <span class="fs-middle text-white">{{content}}</span>
    </div>
  </section>
</template>

<script>
  import './component.scss';

  const Component = require('./component');
  export default new Component();
</script>
