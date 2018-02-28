<template>
  <section class="main-layout index-index-layout">
    <AlertDialog :options="alertDialogOptions"></AlertDialog>
    <ConfirmDialog :options="confirmDialogOptions"></ConfirmDialog>
    <InputDialog :options="inputDialogOptions"></InputDialog>
    <SelectorDialog :options="selectorDialogOptions"></SelectorDialog>
    <ToastLayout></ToastLayout>
    <LoadingLayout></LoadingLayout>
  </section>
</template>

<script>
  import './module.scss';

  const Module = require('./module');
  export default new Module();
</script>
