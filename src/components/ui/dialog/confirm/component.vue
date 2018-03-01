<template>
  <section class="component-layout ui-dialog-confirm-layout global-layout"
           :style="{width:windowWidth+'px',height:windowHeight+'px'}"
           v-show="isShow">
    <div class="dialog-area bg-white shadow fs-normal pd20">
      <p class="title-area" v-if="title">
        <strong><span>{{title}}</span></strong>
      </p>
      <p class="content-area pdt10" v-if="content">
        <span>{{content}}</span>
      </p>
      <p class="operation-area pdt10">
        <span class="pdt20 pdr20 text-blue" @click="cancel">取消</span>
        <span class="pdt20 pdl20 text-blue" @click="confirm">确认</span>
      </p>
    </div>
  </section>
</template>

<script>
  import './component.scss';

  const Component = require('./component');
  export default new Component();
</script>
