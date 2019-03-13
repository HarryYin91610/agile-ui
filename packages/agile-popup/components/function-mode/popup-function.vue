<template lang="pug">
transition(name="agilepop", appear, appear-active-class="agilepop-appear-active")
  div.agile-popup-wrapper(v-if="show")
    
    div.popup-mask-wrap(v-if="mask.show", :style="{backgroundColor: mask.color}")
    
    div.popup-content-wrap(:style="{width: `${width}px`, background: background.type === 'color' ? background.color : 'none'}", ref="agilepop")
      div.background-wrap(v-if="background.type === 'image' ")
        div.background-top.bg-img-center(:style="{height: `${bgTop.height}px`, backgroundImage: `url(${bgTop.src})`}")
        div.background-mid(:style="{backgroundImage: `url(${bgMid.src})`}")
        div.background-bottom.bg-img-center(:style="{height: `${bgBottom.height}px`, backgroundImage: `url(${bgBottom.src})`}")

      div.close-wrapper(
        v-if="close.show", 
        @click="closePop", @mouseenter="close.hover = true", @mouseleave="close.hover = false",
        :style="outerStyle")
        div.close-icon(
          :style="innerStyle")
          close-icon
      
      div.child-wrap
        component(:is="curComponent", :inner-data="innerData", @closepopup="onClose")
      
</template>

<style lang="stylus" scoped>
// 弹出动画
@keyframes agile-pop-bubble1
  from
    opacity 0
    transform: translate3d(0, 100px, 0)
  to
    opacity 1
    transform: translate3d(0, 0, 0)
// 消失动画
@keyframes agile-pop-bubble2
  to
    opacity 0

@keyframes agile-mask-show
  from
    opacity 0
  to
    opacity 0.5

.agilepop-appear-active
  animation agile-pop-bubble1 0.2s linear both 1
.agilepop-leave-active
  animation agile-pop-bubble2 0.15s linear both 1

.agile-popup-wrapper
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  text-align center
  z-index 2000
  .popup-mask-wrap
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    background-color #000000
    opacity 0.5
    animation agile-mask-show 0.25s linear both 1
    animation-delay 0.35s
  .popup-content-wrap
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    transform translate3d(-50%, -50%, 0)
    text-align center
    .child-wrap
      position relative
    .background-wrap
      position absolute
      left 0
      top 0
      display flex
      flex-direction column
      width 100% 
      height 100%
      .background-top, .background-bottom
        width 100%
        flex none
        background-position center
        background-size contain
        background-repeat no-repeat
      .background-mid
        width 100%
        height 100%
        flex auto
        background-repeat repeat-y
        transition all 0.15s
    .close-wrapper
      position absolute
      right 13px
      top 13px
      cursor pointer
      transition all 0.15s
      z-index 2001
      border-radius 50%
      .close-icon
        position absolute 
        left 50% 
        top 50%
        display block
        width 20px
        height 20px
        fill #ffffff
        transition all 0.35s
        transform translate(-50%, -50%)
        transform translate3d(-50%, -50%, 0)

</style>

<script>
import DefaultInner from './default-inner.vue'
import CloseIcon from '../close-icon/index.vue'
import Vue from 'vue'

export default {
  name: 'agile-popup-function',
  data () {
    return {
      // 控制弹框显示
      show: true,
      // 弹框宽度
      width: 433,
      // 背景蒙版设置
      mask: {
        show: true,
        color: '#000000'
      },
      // 背景配置
      background: {
        type: 'color', // color: 背景为纯色；image: 背景为自定义图片，设置为image后bgTop、bgBottom、bgMid才生效
        color: '#1E90FF'
      },
      bgTop: {
        height: 50,
        src: ''
      },
      bgBottom: {
        height: 50,
        src: ''
      },
      bgMid: {
        src: ''
      },
      // 关闭按钮配置
      close: {
        disabled: false,
        show: true,
        hover: false,
        inner: {
          size: 20,
          lineWidth: 6,
          color: {
            normal: '#ffffff',
            hover: '#ffffff'
          }
        },
        outer: {
          right: 13,
          top: 13,
          size: 20,
          color: 'none'
        }
      },
      // 子组件数据
      innerData: {}
    }
  },
  methods: {
    closePop () {
      if (!this.close.disabled) {
        this.show = false
      }
    },
    onClose () {
      this.show = false
    }
  },
  computed: {
    curComponent () {
      if (this.component) {
        Vue.component(this.componentName, this.component)
        return this.componentName
      } else {
        return DefaultInner.name
      }
    },
    innerStyle () {
      return {
        width: `${this.close.inner.size}px`, height: `${this.close.inner.size}px`,
        stroke: this.close.hover ? this.close.inner.color.hover : this.close.inner.color.normal,
        strokeWidth: this.close.inner.lineWidth
      }
    },
    outerStyle () {
      return {
        width: `${this.close.outer.size}px`, height: `${this.close.outer.size}px`,
        right: `${this.close.outer.right}px`, top: `${this.close.outer.top}px`,
        background: this.close.outer.color
      }
    }
  },
  components: {
    CloseIcon,
    DefaultInner
  }
}
</script>
