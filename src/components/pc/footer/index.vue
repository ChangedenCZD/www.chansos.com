<template>
  <section class="component-layout pc-footer-layout">
    <section class="footer-area w">
      <div class="info-layout">
        <h3 class="icon-layout" title="兔子人开源">
          <img src="../../../assets/img/icon_bunny_large.png"/>
          <span>兔子人开源</span>
        </h3>
        <p v-for="item in footer.info" :class="[item.class]" :title="item.content">
          <span>{{item.content}}</span>
        </p>
      </div>
      <div class="link-layout">
        <h3 class="icon-layout" title="友情链接">
          <img src="../../../assets/img/icon_link.png"/>
          <span>友情链接</span>
        </h3>
        <ul class="link-list-layout">
          <li class="link-item" v-for="item in footer.link" :class="[item.class]" v-if="item.href"
              :title="item.content">
            <a :href="item.href" target="_blank">{{item.content}}</a>
          </li>
        </ul>
      </div>
    </section>
    <div class="icp-info-layout mg10">
      <a v-for="item in footer.about" :class="[item.class]"
         :href="item.href?item.href:'javascript:;'" target="_blank" :title="item.content">{{item.content}}</a>
      <!--<span class="pdr20">邮箱：changeden520@gmail.com</span>-->
      <!--<span class="pdr20">Q群：618839726</span>-->
      <!--<span class="pdr20">© 2016 兔子人开源</span>-->
      <!--<a href="http://www.miitbeian.gov.cn/" target="_blank"><span>粤ICP备16095614号</span></a>-->
    </div>
  </section>
</template>

<script>
  import './index.scss';

  const Component = require('./index');
  export default new Component();
</script>
