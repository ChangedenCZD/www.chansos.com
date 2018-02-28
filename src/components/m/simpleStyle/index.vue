<template>
  <section class="component-layout m-simpleStyle-layout"
           :style="{'min-width':windowWidth+'px','min-height':windowHeight+'px'}">
    <MHeaderLayout></MHeaderLayout>
    <section class="content-wrap w100 c-h pdt5">
      <slot></slot>
    </section>
    <MFooterLayout></MFooterLayout>
    <ToastLayout></ToastLayout>
    <LoadingLayout></LoadingLayout>
  </section>
</template>

<script>
  import './index.scss';

  const Component = require('./index');
  export default new Component();
</script>
