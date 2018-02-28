<template>
  <section class="component-layout ui-dialog-selector-layout global-layout"
           :style="{width:windowWidth+'px',height:windowHeight+'px'}"
           v-show="isShow">
    <div class="dialog-area bg-white shadow fs-normal pd20">
      <p class="title-area" v-if="title">
        <strong><span>{{title}}</span></strong>
      </p>
      <p class="content-area pdt10 pdb5" v-if="content">
        <span>{{content}}</span>
      </p>
      <ul class="select-area over-scroll" :style="{maxHeight:maxHeight+'px'}">
        <li class="select-item clickable pd5 pdt10 pdb10" v-for="item,index in selectItem" @click="onSelected(index)">
          <div class="select-item-status-area left mgt5 mgb5 mgr10" v-if="maxCount>1"
               :class="[itemList[index]?'selected':'']">
            <span class="fs-mini text-blue" v-if="itemList[index]">√</span>
          </div>
          <span>{{item}}</span>
        </li>
      </ul>
      <p class="pdt10" v-if="selectWarnMessage">
        <span class="text-red fs-nano">{{selectWarnMessage}}</span>
      </p>
      <p class="operation-area pdt10" v-if="maxCount>1">
        <span class="pdt20 pdr20 text-blue" @click="cancel">取消</span>
        <span class="pdt20 pdl20 text-blue" @click="confirm">确认</span>
      </p>
    </div>
  </section>
</template>

<script>
  import './index.scss';

  const Component = require('./index');
  export default new Component();
</script>
