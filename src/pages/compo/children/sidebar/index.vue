<template lang="pug">
div.demo-sidebar-wrap.p-relative
  sidebar-md
</template>

<style lang="stylus"> 
.demo-sidebar-wrap 
  .nav-section  
    width 600px
    height 400px 
    line-height 400px
    margin-bottom 20px
    border-radius 10px
    text-align center
    font-size 24px
    color #ffffff
    background-color #f89c2d
    &:last-child 
      margin-bottom 0
</style>

<script>
import SidebarMd from './sidebar.md'

export default {
  name: 'demo-sidebar',
  components: {
    SidebarMd
  }
}
</script>
