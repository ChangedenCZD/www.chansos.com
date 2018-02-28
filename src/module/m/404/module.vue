<template>
  <MSimpleStyle class="main-layout m-404-layout">
    <section class="about-info-layout pd20 shadow bg-white mgt20 mgl10 mgr10">
      <h3 class="fs-middle mgb20">抱歉：</h3>
      <p class="mgb20" v-if="url">引用：{{url}}</p>
      <p class="fs-normal">内容已丢失！</p>
    </section>
  </MSimpleStyle>
</template>

<script>
  import './module.scss';

  const Module = require('./module');
  export default new Module();
</script>
