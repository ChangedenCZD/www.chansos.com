<template>
  <section class="component-layout ui-dialog-input-layout global-layout"
           :style="{width:windowWidth+'px',height:windowHeight+'px'}"
           v-show="isShow">
    <div class="dialog-area bg-white shadow fs-normal pd20">
      <p class="title-area" v-if="title">
        <strong><span>{{title}}</span></strong>
      </p>
      <p class="content-area pdt10" v-if="content">
        <span>{{content}}</span>
      </p>
      <p class="input-area pdt15">
        <input class="w100 pd5 pdt10 pdb10" :maxlength="maxLength" :placeholder="inputHint" v-model="inputContent"/>
      </p>
      <p class="length-area pdt10">
        <span class="input-warn-message left fs-nano text-red" v-if="inputWarnMessage">{{inputWarnMessage}}</span>
        <span class="text-blue">{{inputContent.length+' / '+maxLength}}</span>
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
