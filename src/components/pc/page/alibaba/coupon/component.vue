<template>
  <PcSimpleStyle class="component-layout pc-page-alibaba-coupon-layout">
    <PcAlibabaSearchBar :options="alibabaSearchBarOptions"></PcAlibabaSearchBar>
    <section class="alibaba-module-layout bg-white shadow">
      <h3 class="pd15 shadow-bottom fs-normal" title="优惠券">
        <span>优惠券</span>
        <span class="right fs-mini">
          <a class="pdl10 pdr10 text-orange" href="javascript:" title="上一页" @click="page-=1" v-if="page>1">上一页</a>
          <span class="pdl10 pdr10" :title="'第'+page+'页'">第 {{page}} 页</span>
          <a class="pdl10 pdr10 text-orange" href="javascript:" title="下一页" @click="page+=1"
             v-if="itemList.length>=pageSize">下一页</a>
        </span>
      </h3>
      <ul class="alibaba-product-list pdt10" v-if="itemList.length">
        <li class="product-item shadow bg-white mgl10 mgb10" v-for="item in itemList"
            :style="{width:productWidth+'px'}">
          <a :href="item.coupon_click_url" target="_blank" :title="item.title">
            <img :src="item.pict_url"
                 :style="{width:productWidth+'px',height:productWidth+'px'}"/>
            <p class="product-item-title one-line">
              <span>{{item.title}}</span>
            </p>
            <p class="fs-mini one-line">
              <span>{{item.coupon_info}}</span>
            </p>
            <p class="product-item-price text-orange">
              <span>￥{{item.zk_final_price}}</span>
            </p>
            <p class="product-item-end-time text-gray">
              <span>结束时间：{{item.coupon_end_time}}</span>
            </p>
          </a>
        </li>
      </ul>
      <h3 class="empty-data-hint pdt10 fs-small" v-else>-- 暂无推荐 --</h3>
    </section>
  </PcSimpleStyle>
</template>

<script>
  import './component.scss';

  const Component = require('./component');
  export default new Component();
</script>
