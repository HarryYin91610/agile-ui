<template lang="pug">
div.agile-carousel(
  @mouseenter="isHover = true",
  @mouseleave="isHover = false",
  :class="[type]"
  :style="wrapStyle")
  div.main-wrap
    div.content(:style="{transform: centerStyle}")
      slot
    transition(name="arrow-left")
      div.arrow.left(
        v-if="arrowShow",
        v-show="isHover && !arrowLeftDisabled",
        :style="arrowStyle",
        @click="throttledArrowClick(1)")
        div.arrow-svg-wrap
          arrow-svg
    transition(name="arrow-right")
      div.arrow.right(
        v-if="arrowShow",
        v-show="isHover && !arrowRightDisabled",
        :style="arrowStyle",
        @click="throttledArrowClick(-1)")
        div.arrow-svg-wrap
          arrow-svg
  div.indicators(v-if="indicatorShow" :style="indicatorWrapStyle")
    div.indicator-item(
      v-for="(item, index) in items", 
      :class="{active: index === activeIndex}",
      :style="[indicatorStyle, getIndicatorColor(index === activeIndex)]", 
      @mouseenter="throttledIndicatorHover(index)",
      @mouseleave="throttledIndicatorHover(-1)",
      :key="`indicator-${index}`")
</template>

<style lang="stylus" scoped>
.arrow-left-enter-active, .arrow-left-leave-active,
.arrow-right-enter-active, .arrow-right-leave-active 
  transition all 0.35s
.arrow-left-enter, .arrow-left-leave-active 
  transform translate3d(-10px, -50%, 0) !important
  opacity 0
.arrow-right-enter, .arrow-right-leave-active 
  transform translate3d(10px, -50%, 0) !important
  opacity 0

.agile-carousel 
  position relative
  &.card
    .content
      position absolute
      left 50%
      top 50%
      width 100%

  .main-wrap 
    position relative
    width 100%
    height 100%
    overflow hidden
    .arrow 
      position absolute
      top 50%
      width 30px
      height 30px
      padding 5px
      transform translateY(-50%)
      transform translate3d(0, -50%, 0)
      box-sizing border-box
      background-color #99a9bf 
      fill #ffffff
      cursor pointer
      z-index 2
      &.left
        left 10px
      &.right 
        right 10px
        .arrow-svg-wrap
          transform scaleX(-1)
    .content
      width 100%
      display flex 
      justify-content flex-start

  .indicators
    position absolute
    left 50% 
    bottom 0
    text-align center
    transform translate(-50%, 0)
    transform translate3d(-50%, 0, 0)
    z-index 2
    .indicator-item 
      display inline-block
      vertical-align top
      margin-right 10px
      border-radius 50%
      background-color #99a9bf
      cursor pointer
      transition transform 0.15s
      &:last-child 
        margin-right 0
      &.active 
        transform scale(1.2)
        background-color red
</style>

<script>
import ArrowSvg from './arrow-svg.vue'
import { throttle } from '../lib/util'

export default {
  name: 'agile-carousel',
  props: {
    type: {
      type: String,
      default: 'normal' // 显示模式：normal or card， card模式下锚点不可点击
    },
    width: {
      type: Number,
      default: 350 // 每张幻灯片的宽度
    },
    visibleRatio: {
      type: Number,
      default: 0.8 // 仅对card模式有效，可视区域比例(0~1)
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 5000
    },
    initIndex: {
      type: Number,
      default: 0
    },
    arrow: {
      type: Object,
      default () {
        return {
          show: true,
          size: 30,
          color: '',
          background: {
            color: '',
            show: true
          }
        }
      }
    },
    indicator: {
      type: Object,
      default () {
        return {
          show: true,
          bottom: 0,
          size: 0,
          height: 0,
          isRound: true,
          normalColor: '',
          activeColor: ''
        }
      }
    }
  },
  data () {
    return {
      timer: null,
      trigger: 0, // 0 --> arrow, 1 --> indicator
      activeIndex: 0,
      direction: 0,
      items: [],
      isHover: false,
      moving: false
    }
  },
  methods: {
    initActiveIndex () {
      if (this.initIndex < this.items.length && this.initIndex >= 0) {
        this.activeIndex = this.initIndex
      }
    },
    initItemPosition () {
      this.items.forEach((item, index) => {
        item.translateItemByArrow(index, this.activeIndex)
      })
    },
    updateItems () {
      this.items = this.$children.filter(child => child.$options.name === 'agile-carousel-item')
    },
    resetItemPosition (oldIndex) {
      this.items.forEach((item, index) => {
        item.$data.isActive = this.activeIndex === index
        item.translateItemByArrow(index, oldIndex)
      })
      window.setTimeout(() => {
        if (this.direction === 0) {
          this.direction = this.activeIndex - oldIndex > 0 ? -1 : 0
        }
        this.moveToPosition()
      }, 20)
    },
    moveToPosition () {
      this.items.forEach((item, index) => {
        item.show = true
        item.ready = true
        item.adjustPosX(item.offsetX + this.direction * this.width)
        const ts = this.type === 'card' ? 20 : 350
        window.setTimeout(() => {
          item.translateItemByArrow(index, this.activeIndex)
        }, ts)
      })
      window.setTimeout(() => {
        this.moving = false
      }, 350)
    },
    adjustItemPosition (oldIndex) {
      this.items.forEach((item, index) => {
        item.$data.isActive = this.activeIndex === index
        item.translateItemByIndicator(index, this.activeIndex, oldIndex)
      })
      window.setTimeout(() => {
        this.jumpToPosition(oldIndex)
      }, 50)
    },
    jumpToPosition (oldIndex) {
      this.items.forEach((item, index) => {
        if (index === oldIndex || index === this.activeIndex) {
          item.show = true
          item.ready = true
          item.adjustPosX(item.offsetX + this.direction * this.width)
        }
        window.setTimeout(() => {
          item.translateItemByArrow(index, this.activeIndex)
        }, 350)
      })
      window.setTimeout(() => {
        this.moving = false
      }, 350)
    },
    toggleCardByArrow (direction) {
      if (this.moving) { return }
      this.trigger = 0
      this.moving = true
      const total = this.items.length
      if (total <= 1) { return }
      this.direction = direction
      const target = this.activeIndex - this.direction
      if (target < 0) {
        this.activeIndex = this.loop ? total - 1 : 0
      } else if (target >= total) {
        this.activeIndex = this.loop ? 0 : total - 1
      } else {
        this.activeIndex = target
      }
    },
    toggleCardByIndicator (index) {
      if (this.moving || index === -1 || index === this.activeIndex) { return }
      this.moving = true
      this.trigger = 1
      this.direction = index > this.activeIndex ? -1 : 1
      this.activeIndex = index
    },
    pauseTimer () {
      if (this.timer) {
        window.clearInterval(this.timer)
        this.timer = null
      }
    },
    startTimer () {
      if (this.interval <= 0 || !this.autoplay) { return }
      this.timer = window.setInterval(this.playSlides, this.interval)
    },
    playSlides () {
      this.toggleCardByArrow(-1)
    },
    getIndicatorColor (active) {
      const normalColor = this.indicator && this.indicator.normalColor ? this.indicator.normalColor : '#C1CDCD'
      const activeColor = this.indicator && this.indicator.activeColor ? this.indicator.activeColor : '#1E90FF'
      return {
        backgroundColor: active ? activeColor : normalColor
      }
    }
  },
  created () {
    this.throttledArrowClick = throttle(50, direction => {
      this.toggleCardByArrow(direction)
    })
    this.throttledIndicatorHover = throttle(50, index => {
      if (this.type === 'card') { return }
      this.toggleCardByIndicator(index)
    })
  },
  mounted () {
    this.$nextTick(() => {
      this.initActiveIndex()
      this.initItemPosition()
      this.startTimer()
    })
  },
  beforeDestroy () {
    this.pauseTimer()
  },
  computed: {
    indicatorShow () {
      if (typeof this.indicator.show === 'boolean') {
        return this.indicator.show
      } else {
        return true
      }
    },
    visibleWidth () {
      const ratio = this.visibleRatio >= 0 && this.visibleRatio <= 1 ? this.visibleRatio : 1
      return this.width * 3 * ratio
    },
    centerStyle () {
      const transform = this.type === 'card' ? `translate(${-1 * this.width / 2}px, -50%)` : `none`
      return transform
    },
    indicatorStyle () {
      const size = this.indicator && this.indicator.size ? this.indicator.size : 10
      const height = this.indicator && this.indicator.height ? this.indicator.height : 0
      const normalColor = this.indicator && this.indicator.normalColor ? this.indicator.normalColor : '#C1CDCD'
      const isRound = typeof this.indicator.isRound === 'boolean' ? this.indicator.isRound : true
      return {
        width: `${size}px`,
        height: `${height || size}px`,
        borderRadius: isRound ? '50%' : 0,
        backgroundColor: this.activeIndex
      }
    },
    indicatorWrapStyle () {
      const bottom = this.indicator.bottom || 10
      return {
        bottom: `${bottom}px`
      }
    },
    wrapStyle () {
      const width = this.type === 'card' ? this.visibleWidth : this.width
      const height = this.type === 'card' ? 500 : 'auto'
      return {
        width: `${width}px`,
        height: `${height}px`
      }
    },
    arrowShow () {
      if (this.arrow && typeof this.arrow.show === 'boolean') {
        return this.arrow.show
      } else {
        return true
      }
    },
    arrowStyle () {
      const size = this.arrow.size || 30
      const color = this.arrow.color || '#ffffff'
      let showBackground = true
      let background = '#99a9bf'
      if (this.arrow && this.arrow.background) {
        showBackground = typeof this.arrow.background.show === 'boolean' ? this.arrow.background.show : true
        background = this.arrow.background.color ? this.arrow.background.color : background
      }
      return {
        width: `${size}px`,
        height: `${size}px`,
        fill: color,
        backgroundColor: showBackground ? background : 'transparent'
      }
    },
    arrowLeftDisabled () {
      return !this.loop && this.activeIndex === 0
    },
    arrowRightDisabled () {
      return !this.loop && this.activeIndex === this.items.length - 1
    }
  },
  watch: {
    items (val) {
      if (val.length > 0) { this.initActiveIndex() }
    },
    activeIndex (val, oldVal) {
      if (this.trigger === 0) {
        this.resetItemPosition(oldVal)
      } else {
        this.adjustItemPosition(oldVal)
      }
      this.$emit('toggleindex', val)
    },
    autoplay (val) {
      val ? this.startTimer() : this.pauseTimer()
    },
    isHover (val) {
      val ? this.pauseTimer() : this.startTimer()
    }
  },
  components: {
    ArrowSvg
  }
}
</script>
