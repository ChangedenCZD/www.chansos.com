<template>
  <PcSimpleStyle class="main-layout alibaba-juhuasuan-layout">
    <PcAlibabaSearchBar :options="alibabaSearchBarOptions"></PcAlibabaSearchBar>
    <section class="alibaba-module-layout bg-white shadow">
      <h3 class="pd15 shadow-bottom fs-normal" title="聚划算">
        <span>聚划算</span>
        <span class="right fs-mini">
          <a class="pdl10 pdr10 text-orange" href="javascript:;" title="上一页" @click="page-=1" v-if="page>1">上一页</a>
          <span class="pdl10 pdr10" :title="'第'+page+'页'">第 {{page}} 页</span>
          <a class="pdl10 pdr10 text-orange" href="javascript:;" title="下一页" @click="page+=1"
             v-if="itemList.length>=pageSize">下一页</a>
        </span>
      </h3>
      <ul class="alibaba-product-list pdt10" v-if="itemList.length">
        <li class="product-item shadow bg-white mgl10 mgb10" v-for="item in itemList"
            :style="{width:productWidth+'px'}">
          <a :href="item.pc_url" target="_blank" :title="item.title">
            <img :src="item.pic_url_for_p_c"
                 :style="{width:productWidth+'px',height:productWidth+'px'}"/>
            <p class="product-item-title one-line">
              <span>{{item.title}}</span>
            </p>
            <p class="product-item-price text-orange">
              <span>￥{{item.act_price}}</span>
            </p>
            <p class="product-item-end-time text-gray">
              <span>结束时间：{{format(item.show_end_time)}}</span>
            </p>
          </a>
        </li>
      </ul>
      <h3 class="empty-data-hint pdt10 fs-small" v-else>-- 暂无推荐 --</h3>
    </section>
  </PcSimpleStyle>
</template>

<script>
  import './module.scss';

  const Module = require('./module');
  export default new Module();
</script>
