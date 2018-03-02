<template>
  <Bootstrap class="main-layout">
    <PcLayout slot="pc"></PcLayout>
    <MLayout slot="m"></MLayout>
  </Bootstrap>
</template>

<script>
  import './module.scss';

  const Module = require('./module');
  export default new Module();
</script>
