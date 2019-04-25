<template lang="pug">
div.demo-sidebar-wrap.p-relative
  sidebar-md
</template>

<style lang="stylus"> 
.demo-sidebar-wrap 
  .button-wrap
    margin-bottom 20px
  .nav-section  
    width 600px
    height 400px 
    line-height 400px
    margin 0 auto 30px
    border-radius 10px
    text-align center
    box-sizing border-box
    box-shadow 2px 2px 2px 2px rgba(0,0,0,0.2)
    font-size 20px
    color #455a64
    background-color #E0EEEE
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
