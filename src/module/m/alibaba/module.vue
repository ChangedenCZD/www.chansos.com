<template>
  <MSimpleStyle class="main-layout m-alibaba-layout">
    <PcAlibabaSearchBar :options="alibabaSearchBarOptions"></PcAlibabaSearchBar>
    <section class="alibaba-module-layout bg-white shadow mgl10 mgr10">
      <h3 class="pd15 shadow-bottom fs-normal">
        <span>聚划算</span>
        <a class="right fs-mini" href="/m/alibaba/juhuasuan.html">更多＋</a>
      </h3>
      <ul class="alibaba-product-list pdt10" v-if="jhsProductList.length">
        <li class="product-item shadow bg-white mgl10 mgb10" v-for="item in jhsProductList"
            :style="{width:productWidth+'px'}">
          <a :href="item.wap_url" target="_blank" :title="item.title">
            <img :src="item.pic_url_for_w_l"
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
    <section class="alibaba-module-layout bg-white shadow mgt20 mgl10 mgr10">
      <h3 class="pd15 shadow-bottom fs-normal">
        <span>优惠券</span>
        <a class="right fs-mini" href="/m/alibaba/coupon.html">更多＋</a>
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
  </MSimpleStyle>
</template>

<script>
  import './module.scss';

  const Module = require('./module');
  export default new Module();
</script>
