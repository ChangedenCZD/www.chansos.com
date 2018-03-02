<template>
  <PcSimpleStyle class="component-layout pc-page-article-layout">
    <section class="article-module-layout bg-white shadow mgt20">
      <h3 class="pd15 shadow-bottom fs-normal" title="项目">
        <span>项目</span>
        <a class="right fs-mini" href="/article/project.html" target="_blank" title="更多内容">更多＋</a>
      </h3>
      <ul class="article-list pdt15 pdl15 pdr15 pdb5" v-if="projectList.length">
        <PcArticleLayout :item="article" v-for="article in projectList" v-bind:data="article"
                         v-bind:key="article.title"></PcArticleLayout>
      </ul>
    </section>
    <section class="article-module-layout bg-white shadow mgt20">
      <h3 class="pd15 shadow-bottom fs-normal" title="头条号">
        <span>头条号</span>
        <a class="right fs-mini" href="/article/toutiao.html" target="_blank" title="更多内容">更多＋</a>
      </h3>
      <ul class="article-list pdt15 pdl15 pdr15 pdb5" v-if="toutiaoList.length">
        <PcArticleLayout :item="article" v-for="article in toutiaoList" v-bind:data="article"
                         v-bind:key="article.title"></PcArticleLayout>
      </ul>
    </section>
    <section class="article-module-layout bg-white shadow mgt20">
      <h3 class="pd15 shadow-bottom fs-normal" title="公众号">
        <span>公众号</span>
        <a class="right fs-mini" href="/article/gongzhonghao.html" target="_blank" title="更多内容">更多＋</a>
      </h3>
      <ul class="article-list pdt15 pdl15 pdr15 pdb5" v-if="gongzhonghaoList.length">
        <PcArticleLayout :item="article" v-for="article in gongzhonghaoList" v-bind:data="article"
                         v-bind:key="article.title"></PcArticleLayout>
      </ul>
    </section>
  </PcSimpleStyle>
</template>

<script>
  import './component.scss';

  const Component = require('./component');
  export default new Component();
</script>
