<template>
  <section class="component-layout m-header-layout">
    <div class="navigation-bar-layout w100">
      <div class="navigation-bar w100 c-h bg-white shadow-bottom">
        <div class="navigation-icon-layout">
          <img class="icon" src="https://image.chansos.com/static/icon_bunny_large.png"/>
          <span class="name">兔子人开源</span>
        </div>
        <div class="navigation-more">
          <div class="more clickable" @click="isShowMenu=true">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABnklEQVR4Xu2aTU7DQAyFn8PPlt6A6U3gBBQJJJZwMlgiYJGeAG7S4QZlSyBGSZEgIaCpqtoheVlGk4795nmc+VLByC8Zef6gAHTAyBVgCYzcANwEWQIsAScF9CIEvOOwnn4Hz3Ibo0co5iWgszDRfVwDMmsmrLm84kryuLQUwlSAOvk9LCAy6UxSdSkFppYimApQnoccIid/r7Dm2V08tXKBmQBVzWspi5TEJNOp1Z5gJ8BZONJMHpMEKPVYHuJTythNx1CATRVMfX70JVAJlbQJqs6z+9hqkakyrz/OrASq0FZtUCIEB91tEC9SaBhsG/wSATc/2qHqXApcWiZfxWPqgO+rXr8KvyHU93YRrdpe23luAqxfrdt5ggJsR9f/86t0gNdakQeQB3R4jzygflUiDyAPIA8YIhAZOxIjDyAPWPX9z28D5AHkAV6HkNa8PA32ZCHcwqADvKQnDyAPIA/4pfrIA0AeQB5AHjC8v8iQB5AHkAc0+j55gNchhDygqQCPwz1xolsYdICb9D2ZmA7oyUK4hUEHuEnfk4k/AHbcIFCgWJFyAAAAAElFTkSuQmCC"/>
          </div>
          <span class="path">{{title}}</span>
        </div>
      </div>
      <div class="navigation-area" v-show="isShowMenu" @click.self="isShowMenu=false">
        <ul class="navigation-menu-list shadow">
          <li v-for="item in navigation" class="clickable" v-if="!isActive(item)">
            <a :href="'/m'+item.href">{{item.title}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="expansion-layout w100">
    </div>
  </section>
</template>

<script>
  import './component.scss';

  const Component = require('./component');
  export default new Component();
</script>
