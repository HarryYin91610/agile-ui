<template lang="pug">
div.sidebar-wrap.p-relative.f-left.border-box

  ul.nav-list.layer-1
    
    li.nav-item
      div.title
        | {{ title }}
      ul.nav-list.layer-2
        li.nav-item(
          v-for="(nav, index) in navList", 
          :class="{active: curSubtab === index}", 
          @click="toggleSideTab(index)",
          :key="`nav-${index + 1}`")
          div.title
            | {{ nav.en }}

</template>

<style lang="stylus" scoped>    
.sidebar-wrap
  width 234px 
  padding-top 20px
  border-right 3px solid #f1f4f8
  .nav-list
    .nav-item
      .title
        padding-left 20px
        color #455a64
        transition color 0.15s
        
    &.layer-1
      font-weight bold
      font-size 16px
      .title
        height 50px
        line-height 50px
    &.layer-2
      font-weight normal
      font-size 14px
      .nav-item
        .title
          position relative
          height 40px
          line-height 40px
          cursor pointer
          &:after
            position absolute
            right -3px
            top 0
            width 100%
            height 100%
            display block 
            content ''
            border-right 3px solid #00CDCD
            transform scaleY(0)
            transition all 0.15s
        &:hover, &.active
          .title
            color #00BFFF
        &.active
          .title
            &:after 
              transform scaleY(1)
          
</style>

<script>
const guideCount = 3

export default {
  name: 'sidebar',
  props: ['title', 'navList', 'curSubtab'],
  methods: {
    toggleSideTab (target) {
      if (target === this.curSubtab) { return }
      this.$emit('togglesubtab', this.navList[target].path)
    }
  }
}
</script>
