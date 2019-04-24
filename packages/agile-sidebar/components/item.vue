<template lang="pug">
div.nav-item(
  :class="{active: curPos === index}",
  :style="[itemStyle, itemColor]",
  @mouseenter="onHover(index)",
  @mouseleave="onHover(-1)",
  @click="scrollTo"
)
  | {{ setting.text }}

</template>

<style lang="stylus" scoped> 
.nav-item
  position relative
  width 100% 
  text-align center
  transition all 0.15s
  cursor pointer
  overflow hidden
  // &:before, &:after 
  //   position absolute 
  //   top 15px
  //   content ''
  //   width 0
  //   height 0 
  //   border 10px solid transparent
  //   border-left-color #ffc13b
  //   transition all 0.35s
  //   opacity 0
  // &:before 
  //   left 12px
  //   transform translate(-20px, 0)
  // &:after 
  //   right 12px
  //   transform translate(20px, 0) scaleX(-1)
  // &:hover 
  //   color #f89c2d
  // &.active 
  //   color #f89c2d
  //   &:before
  //     transform translate(0, 0)
  //     opacity 1
  //   &:after 
  //     transform translate(0, 0) scaleX(-1)
  //     opacity 1
      
</style>

<script>
import { moveScreenTo } from '../lib/scroll'

export default {
  props: {
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
      required: true,
      default () {
        return {
          font: {
            size: 0,
            normal: '',
            active: ''
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
      if (this.custom && this.custom.font) {
        const normal = this.custom.font.normal || '#696969'
        const active = this.custom.font.active || '#ffffff'
        return {
          color: this.hover === this.index || this.curPos === this.index ? active : normal
        }
      } else {
        return null
      }
    },
    itemStyle () {
      if (this.custom) {
        const height = `${this.custom.height || 50}px`
        let fontSize
        if (this.custom.font) {
          fontSize = `${this.custom.font.size || 16}px`
        }
        return {
          height,
          lineHeight: height,
          fontSize
        }
      } else {
        return null
      }
    }
  }
}
</script>