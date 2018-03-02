<template>
  <section class="component-layout bootstrap-layout">
    <section v-if="isPc">
      <slot name="pc"></slot>
    </section>
    <section v-else>
      <slot name="m"></slot>
    </section>
  </section>
</template>

<script>
  import './component.scss';

  const Component = require('./component');
  export default new Component();
</script>
