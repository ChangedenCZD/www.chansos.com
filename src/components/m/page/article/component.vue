<template>
  <MSimpleStyle class="component-layout m-page-article-layout">
    <section class="article-module-layout bg-white shadow mgt20 mgl10 mgr10">
      <h3 class="pd15 shadow-bottom fs-normal">
        <span>项目</span>
        <a class="right fs-mini" href="/article/project.html">更多＋</a>
      </h3>
      <ul class="article-list pdt15 pdl15 pdr15 pdb5" v-if="projectList.length">
        <PcArticleLayout :item="article" v-for="article in projectList" v-bind:data="article"
                         v-bind:key="article.title"></PcArticleLayout>
      </ul>
    </section>
    <section class="article-module-layout bg-white shadow mgt20 mgl10 mgr10">
      <h3 class="pd15 shadow-bottom fs-normal">
        <span>头条号</span>
        <a class="right fs-mini" href="/article/toutiao.html">更多＋</a>
      </h3>
      <ul class="article-list pdt15 pdl15 pdr15 pdb5" v-if="toutiaoList.length">
        <PcArticleLayout :item="article" v-for="article in toutiaoList" v-bind:data="article"
                         v-bind:key="article.title"></PcArticleLayout>
      </ul>
    </section>
    <section class="article-module-layout bg-white shadow mgt20 mgl10 mgr10">
      <h3 class="pd15 shadow-bottom fs-normal">
        <span>公众号</span>
        <a class="right fs-mini" href="/article/gongzhonghao.html">更多＋</a>
      </h3>
      <ul class="article-list pdt15 pdl15 pdr15 pdb5" v-if="gongzhonghaoList.length">
        <PcArticleLayout :item="article" v-for="article in gongzhonghaoList" v-bind:data="article"
                         v-bind:key="article.title"></PcArticleLayout>
      </ul>
    </section>
  </MSimpleStyle>
</template>

<script>
  import './component.scss';

  const Component = require('./component');
  export default new Component();
</script>
