<template lang="pug">
div.demo-carousel-wrap.p-relative
  carousel-md
</template>

<style lang="stylus">   
.demo-carousel-wrap
  .large-demo
    padding 50px 20px
  .custom-inner
    width 100%
    height 200px
    line-height 200px
    text-align center
    font-size 24px
    color #ffffff
    background-color #000000
    &.color-1
      background-color #00CDCD
    &.color-2
      background-color #EE82EE
    &.color-3
      background-color #FFB90F
    &.color-4
      background-color #00B2EE
    &.card
      height 400px
	
</style>

<script>
import CarouselMd from './carousel.md'

export default {
  name: 'demo-carousel',
  components: {
    CarouselMd
  }
}
</script>
