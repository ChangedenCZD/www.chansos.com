<template>
  <MSimpleStyle class="main-layout m-index-layout">
    <section class="alibaba-module-layout bg-white shadow mgt20 mgl10 mgr10">
      <h3 class="pd15 shadow-bottom fs-normal">
        <span>热销推荐</span>
        <a class="right fs-mini" href="/m/alibaba.html">更多＋</a>
      </h3>
      <div class="alibaba-product-list-layout pdt10" v-if="couponList.length||jhsProductList.length">
        <ul class="alibaba-product-list">
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
      </div>
    </section>
    <section class="article-module-layout bg-white shadow mgt20 mgl10 mgr10">
      <h3 class="pd15 shadow-bottom fs-normal">
        <span>热点推荐</span>
        <a class="right fs-mini" href="/m/article.html">更多＋</a>
      </h3>
      <div class="article-list-layout pdt15 pdl15 pdr15 pdb5"
           v-if="projectList.length||toutiaoList.length||gongzhonghaoList.length">
        <ul class="article-list">
          <PcArticleLayout :item="article" v-for="article in projectList" v-bind:data="article"
                           v-bind:key="article.title"></PcArticleLayout>
          <PcArticleLayout :item="article" v-for="article in toutiaoList" v-bind:data="article"
                           v-bind:key="article.title"></PcArticleLayout>
          <PcArticleLayout :item="article" v-for="article in gongzhonghaoList" v-bind:data="article"
                           v-bind:key="article.title"></PcArticleLayout>
        </ul>
      </div>
    </section>
  </MSimpleStyle>
</template>

<script>
  import './module.scss';

  const Module = require('./module');
  export default new Module();
</script>
