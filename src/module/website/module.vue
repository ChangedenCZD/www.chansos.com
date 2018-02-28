<template>
  <PcSimpleStyle class="main-layout website-layout">
    <ul class="website-layout">
      <li class="website-type-list shadow bg-white mg10 mgb20 over-hidden" v-for="type in typeList">
        <h3 class="website-type-name text-white pd15 shadow-bottom fs-normal" :style="{'background':type.background}"
            :title="type.name">
          <span>{{type.name}}</span>
          <a class="right fs-mini text-white" href="javascript:;" @click="showAddWebsite" title="添加网站">添加＋</a>
        </h3>
        <ul class="website-list pdt20 pdr20">
          <li class="website-item mgl20 mgb20 fs-small shadow clickable pd10 pdl20 pdr20"
              v-for="website in websiteList[type.type]">
            <a :href="en(website.href)" target="_blank" :title="website.title">{{website.title}}</a>
          </li>
        </ul>
      </li>
    </ul>
    <AddWebsiteLayout></AddWebsiteLayout>
  </PcSimpleStyle>
</template>

<script>
  import './module.scss';

  const Module = require('./module');
  export default new Module();
</script>
