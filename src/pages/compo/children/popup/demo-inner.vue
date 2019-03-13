<template lang="pug">
div.demo-inner-wrap
  div.title 子组件title 
  p.content 子组件content
  p.content 子组件content
  p.content 子组件content
  p.content {{ innerData.text }}
  div.button-wrap
    agile-button(content="关闭", @click.native="closePop")
  
</template>

<style lang="stylus" scoped>
.demo-inner-wrap
  width 100% 
  height 280px
  padding 20px 0
  box-sizing border-box
  text-align center
  color #1E90FF
  background-color #ffffff 
  border-radius 10px
  border 2px solid #1E90FF
  .title 
    margin-bottom 20px
    font-size 32px
  .content 
    line-height 28px
    font-size 20px
  .button-wrap
    margin-top 20px
</style>

<script>
export default {
  props: ['innerData'],
  methods: {
    closePop () {
      this.$emit('closepopup')
    }
  }
}
</script>
