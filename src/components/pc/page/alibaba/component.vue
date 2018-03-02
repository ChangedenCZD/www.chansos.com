<template>
  <PcSimpleStyle class="component-layout pc-page-alibaba-layout">
    <PcAlibabaSearchBar :options="alibabaSearchBarOptions"></PcAlibabaSearchBar>
    <section class="alibaba-module-layout bg-white shadow">
      <h3 class="pd15 shadow-bottom fs-normal" title="聚划算">
        <span>聚划算</span>
        <a class="right fs-mini" href="/alibaba/juhuasuan.html" target="_blank" title="更多内容">更多＋</a>
      </h3>
      <ul class="alibaba-product-list pdt10" v-if="jhsProductList.length">
        <li class="product-item shadow bg-white mgl10 mgb10" v-for="item in jhsProductList"
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
    </section>
    <section class="alibaba-module-layout bg-white shadow mgt20">
      <h3 class="pd15 shadow-bottom fs-normal" title="优惠券">
        <span>优惠券</span>
        <a class="right fs-mini" href="/alibaba/coupon.html" target="_blank" title="更多内容">更多＋</a>
      </h3>
      <ul class="alibaba-product-list pdt10" v-if="couponList.length">
        <li class="product-item shadow bg-white mgl10 mgb10" v-for="item in couponList"
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
    </section>
  </PcSimpleStyle>
</template>

<script>
  import './component.scss';

  const Component = require('./component');
  export default new Component();
</script>
