<template>
  <PcSimpleStyle class="component-layout pc-page-article-project-layout">
    <section class="article-module-layout bg-white shadow">
      <h3 class="pd15 shadow-bottom fs-normal" title="项目">
        <span>项目</span>
        <span class="right fs-mini">
          <a class="pdl10 pdr10 text-orange" href="javascript:" title="上一页" @click="page-=1" v-if="page>1">上一页</a>
          <span class="pdl10 pdr10" :title="'第'+page+'页'">第 {{page}} 页</span>
          <a class="pdl10 pdr10 text-orange" href="javascript:" title="下一页" @click="page+=1"
             v-if="itemList.length>=pageSize">下一页</a>
        </span>
      </h3>
      <ul class="article-list pdt15 pdl15 pdr15 pdb5" v-if="itemList.length">
        <PcArticleLayout :item="article" v-for="article in itemList" v-bind:data="article"
                         v-bind:key="article.title"></PcArticleLayout>
      </ul>
      <h3 class="empty-data-hint pdt10 fs-small" v-else>-- 暂无文章 --</h3>
    </section>
  </PcSimpleStyle>
</template>

<script>
  import './component.scss';

  const Component = require('./component');
  export default new Component();
</script>
