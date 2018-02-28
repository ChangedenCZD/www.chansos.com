<template>
  <PcSimpleStyle class="main-layout 404-layout">
    <section class="about-info-layout pd20 shadow bg-white mgt20">
      <h3 class="fs-middle mgb20">抱歉：</h3>
      <p class="mgb20" v-if="url" :title="url">引用：{{url}}</p>
      <p class="fs-normal">内容已丢失！</p>
    </section>
  </PcSimpleStyle>
</template>

<script>
  import './module.scss';

  const Module = require('./module');
  export default new Module();
</script>
