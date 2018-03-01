<template>
  <section class="component-layout pc-website-addWebsiteLayout-layout global-layout"
           v-if="isShowAddWebsite"
           @click.self="hideAddWebsite"
           :style="{'width':windowWidth+'px','height':windowHeight+'px'}">
    <section class="add-website-layout bg-white shadow fix lt0 over-hidden" :style="{'left':left+'px','top':top+'px'}">
      <h3 class="bg-orange text-white pd15 shadow-bottom fs-normal">提交网站</h3>
      <div class="add-website-info-input pd15">
        <div>
          <p class="pdt15 pdb15 fs-small">网站名称</p>
          <p>
            <input class="pd10 fs-small w100" v-model="title" maxlength="14" title="网站名称" placeholder="请输入网站名称（2～14位）"/>
          </p>
        </div>
        <div>
          <p class="pdt15 pdb15 fs-small">网址</p>
          <p>
            <input class="pd10 fs-small w100" v-model="website" maxlength="100" title="网址" placeholder="请输入网址（2～100位）"/>
          </p>
        </div>
        <div>
          <p class="pdt15 pdb15 fs-small">联系邮箱</p>
          <p>
            <input class="pd10 fs-small w100" v-model="email" title="联系邮箱" placeholder="请输入联系邮箱"/>
          </p>
        </div>
      </div>
      <button class="submit-btn w100 pdt15 pdb15 mgt10 fs-normal shadow-top" type="orange" @click="submit">提交审核</button>
    </section>
    <AlertDialog :options="alertDialogOptions"></AlertDialog>
  </section>
</template>

<script>
  import './component.scss';

  const Component = require('./component');
  export default new Component();
</script>
