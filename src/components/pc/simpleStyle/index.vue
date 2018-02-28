<template>
  <section class="component-layout pc-simpleStyle-layout"
           :style="{'min-width':windowWidth+'px','min-height':windowHeight+'px'}">
    <PcHeaderLayout></PcHeaderLayout>
    <section class="content-wrap w c-h pdt5">
      <slot></slot>
    </section>
    <PcFooterLayout></PcFooterLayout>
    <PcAdsLayout></PcAdsLayout>
    <ToastLayout></ToastLayout>
    <LoadingLayout></LoadingLayout>
  </section>
</template>

<script>
  import './index.scss';

  const Component = require('./index');
  export default new Component();
</script>
