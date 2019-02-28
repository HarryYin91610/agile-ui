<template lang="pug">
div.demo-block.p-relative(@mouseenter="isHover = true", @mouseleave="isHover = false")
  slot(name="source")
  div.meta(ref="meta", :style="{height: `${metaHeight}px`}")
    div.description(v-if="$slots.default")
      slot
    slot(name="highlight")
  div.demo-block-control(:class="{opposite: isExpanded}", @click="isExpanded = !isExpanded")
    span.content(:class="{hovering: isHover}")
      span.arrow
      span.tip-text(:class="{hovering: isHover}")
        | {{ tipTxt }}
</template>

<style lang="stylus" scoped> 
.demo-block
  border solid 1px #ebebeb
  border-radius 5px
  transition 0.2s
  &:hover 
    box-shadow 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5)
    
  code 
    font-family Menlo, Monaco, Consolas, Courier, monospace
  .source 
    padding 24px  
  .meta 
    background-color #fafafa
    border-top solid 1px #eaeefb
    overflow hidden
    height 0
    transition height 0.2s 
  .description 
    padding 20px
    box-sizing border-box
    border solid 1px #ebebeb
    border-radius 3px
    font-size 14px
    line-height 22px
    color #666
    word-break break-word
    margin 10px
    background-color #fff
    p 
      margin 0
      line-height 26px
    code 
      color #5e6d82
      background-color #e6effb
      margin 0 4px
      display inline-block
      padding 1px 5px
      font-size 12px
      border-radius 3px
      height 18px
      line-height 18px

  .highlight 
    padding 0 10px 10px
    pre 
      margin 0
    code.hljs 
      margin 0
      border none
      max-height none
      border-radius 0
      &:before 
        content none

  .demo-block-control
    position relative
    height 44px
    line-height 44px
    margin-top -1px
    box-sizing border-box
    text-align center
    background-color #ffffff
    border-top solid 1px #eaeefb
    border-bottom-left-radius 4px
    border-bottom-right-radius 4px
    color #d3dce6
    cursor pointer
    transition all 0.35s
    &.opposite .arrow
      transform scaleY(-1)
    &:hover
      background-color #F0FFFF
      .arrow 
        border-top-color #00CED1 !important
      .tip-text 
        color #00CED1 !important
    .content
      display inline-block
      transform translate(40px, 0)
      transition all 0.35s
      &.hovering
        transform translate(0px, 0)

      .arrow
        width 0
        height 0
        margin-top -2px
        display inline-block
        vertical-align middle
        border 5px solid transparent
        border-top-color #C1CDCD
        transition all 0.35s
        
      .tip-text
        display inline-block
        vertical-align middle
        margin-left 5px
        color #C1CDCD
        opacity 0
        transition all 0.35s
        &.hovering
          opacity 1

  

</style>

<script>
export default {
  name: 'demo-block',
  props: {
    jsfiddle: Object,
    default () {
      return {}
    }
  },
  data () {
    return {
      isHover: false,
      isExpanded: false,
      metaHeight: 0
    }
  },
  computed: {
    tipTxt () {
      return this.isExpanded ? '隐藏代码' : '显示代码'
    },
    codeAreaHeight () {
      if (this.$el.getElementsByClassName('description').length > 0) {
        return this.$el.getElementsByClassName('description')[0].clientHeight +
          this.$el.getElementsByClassName('highlight')[0].clientHeight + 20
      }
      return this.$el.getElementsByClassName('highlight')[0].clientHeight
    }
  },
  watch: {
    isExpanded (val) {
      this.metaHeight = val ? this.codeAreaHeight : 0
      // this.codeArea.style.height = val ? `${ this.codeAreaHeight + 1 }px` : '0';
      // if (!val) {
      //   this.fixedControl = false;
      //   this.$refs.control.style.left = '0';
      //   this.removeScrollHandler();
      //   return;
      // }
      // setTimeout(() => {
      //   this.scrollParent = document.querySelector('.page-component__scroll > .el-scrollbar__wrap');
      //   this.scrollParent && this.scrollParent.addEventListener('scroll', this.scrollHandler);
      //   this.scrollHandler();
      // }, 200);
    }
  }
}
</script>
