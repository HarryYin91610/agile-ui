<template lang="pug">
div.demo-layout-wrap.p-relative
  layout-md
</template>

<style lang="stylus">  
.demo-layout-wrap 
  .bg-blue 
    background #1E90FF
  
  .col-content 
    border-radius 4px
    min-height 36px
  
  .outline 
    padding 5px
    margin-bottom 10px
    background-color 	#BFEFFF
    border-radius 4px
    &:last-child 
      margin-bottom 0

  .agile-row 
    margin-bottom 10px
    &:last-child 
      margin-bottom 0

</style>

<script>
import LayoutMd from './layout.md'

export default {
  name: 'demo-layout',
  components: {
    LayoutMd
  }
}
</script>
