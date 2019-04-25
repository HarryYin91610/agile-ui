<template lang="pug">
div.nav-item(
  :class="{active: curPos === index}",
  :style="[itemStyle, itemColor]",
  @mouseenter="onHover(index)",
  @mouseleave="onHover(-1)",
  @click="scrollTo"
)
  | {{ setting.text }}
  span.arrow.left(v-if="arrowShow", :style="arrowStyle")
  span.arrow.right(v-if="arrowShow", :style="arrowStyle")

</template>

<style lang="stylus" scoped> 
$height = 50px

.nav-item
  position relative
  width 100% 
  height $height
  line-height $height
  text-align center
  color #87CEFA	
  transition all 0.15s
  cursor pointer
  overflow hidden
  .arrow
    position absolute 
    top 15px
    display block
    width 0
    height 0 
    border 10px solid transparent
    border-left-color #ffffff
    transition all 0.35s
    opacity 0
    &.left 
      left 12px
      transform translate(-20px, 0)
    &.right 
      right 12px
      transform translate(20px, 0) scaleX(-1)
  &:hover 
    color #ffffff
  &.active 
    color #ffffff
    .left
      transform translate(0, 0)
      opacity 1
    .right
      transform translate(0, 0) scaleX(-1)
      opacity 1
      
</style>

<script>
import { moveScreenTo } from '../lib/scroll'

// 默认样式
const initHeight = 50
const initfontSize = 16
const initColor1 = '#696969'
const initColor2 = '#ffffff'

export default {
  props: {
    mode: {
      type: String,
      default: 'normal'
    },
    curPos: {
      type: Number,
      required: true,
      default: -1
    },
    hover: {
      type: Number,
      required: true,
      default: -1
    },
    index: {
      type: Number,
      required: true,
      default: -1
    },
    scrolling: {
      type: Boolean,
      required: true,
      default: false
    },
    setting: {
      type: Object,
      required: true,
      default () {
        return {
          text: '',
          id: ''
        }
      }
    },
    custom: {
      type: Object,
      default () {
        return {
          font: {
            size: 0,
            normal: '',
            active: ''
          },
          arrow: {
            show: true,
            color: ''
          },
          height: 0
        }
      }
    }
  },
  methods: {
    async scrollTo () {
      if (!this.setting || !this.setting.id || this.index === -1) { return }
      this.$emit('startscroll')
      const rect = document.getElementById(this.setting.id).getBoundingClientRect()
      const curScroll = document.documentElement.scrollTop || document.body.scrollTop
      const absoluteY = rect.top + curScroll - 50
      this.$emit('scrollto', this.index)
      await moveScreenTo(curScroll, absoluteY, 60)
      this.$emit('endscroll')
    },
    onHover (index) {
      this.$emit('onhover', index)
    }
  },
  computed: {
    itemColor () {
      if (this.mode === 'advanced' && this.custom && this.custom.font) {
        const normal = this.custom.font.normal || initColor1
        const active = this.custom.font.active || initColor2
        return {
          color: this.hover === this.index || this.curPos === this.index ? active : normal
        }
      } else {
        return null
      }
    },
    itemStyle () {
      if (this.mode === 'advanced' && this.custom) {
        const height = `${this.custom.height || initHeight}px`
        let fontSize
        if (this.custom.font) {
          fontSize = `${this.custom.font.size || initfontSize}px`
        }
        return {
          height,
          lineHeight: height,
          fontSize
        }
      } else {
        return null
      }
    },
    arrowStyle () {
      if (this.mode === 'advanced' && this.custom && this.custom.arrow) {
        const borderLeftColor = this.custom.arrow.color || '#f89c2d'
        return {
          borderLeftColor
        }
      } else {
        return null
      }
    },
    arrowShow () {
      if (this.custom && this.custom.arrow && typeof this.custom.arrow.show === 'boolean') {
        return this.custom.arrow.show
      } else {
        return true
      }
    }
  }
}
</script>