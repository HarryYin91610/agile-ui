<template lang="pug">
header.page-header-wrap.p-fixed.border-box
  div.container.m-auto.f-clear
    div.logo-wrap.f-left.pointer(@click="toggleToHome")
      span.logo-title.fs-22
        | {{ appSetting.title }}
      span.logo-ver.fs-14
        | {{ appSetting.version }}
      
    div.routes-wrap.f-right
      div.route.p-relative.dp-i-block.border-box.pointer(
        v-for="(navItem, index) in appSetting.navConfig", 
        @click="toggleTab(index)", 
        :class="{active: curTab === index}", 
        :key="index")
        span.r-inner
          | {{ navItem.chn }}

    
</template>

<style lang="stylus" scoped>
.page-header-wrap
  left 0
  top 0
  width 100% 
  height 60px
  line-height 60px
  font-size 16px
  color #333333
  background-color #ffffff
  border-bottom 1px solid #f1f4f8
  z-index 100
  .container
    width 1140px
    margin auto

    .logo-wrap 
      .logo-title 
        color #00CDCD
      .logo-ver
        margin-left 8px
        opacity 0.7
    
    .routes-wrap 
      .route 
        height 60px
        line-height 60px
        &:before
          position absolute 
          left 0
          top 0
          display block
          content ''
          width 100% 
          height 100% 
          box-sizing border-box 
          border-bottom 1px solid #00CDCD
          transform scaleX(0)
          transition transform 0.15s
        .r-inner
          padding 0 30px
          border-right 2px solid #f1f4f8
        &:last-child
          .r-inner
            border none
        &:hover, &.active
          color #1E90FF
        &.active
          &:before 
            transform scaleX(1)
          
          
</style>

<script>
export default {
  name: 'page-header',
  props: ['appSetting', 'curTab'],
  methods: {
    toggleToHome () {
      this.$router.push('/')
    },
    toggleTab (target) {
      if (target === this.curTab) { return }
      this.$emit('togglepath', this.appSetting.navConfig[target].path)
    }
  }
}
</script>
