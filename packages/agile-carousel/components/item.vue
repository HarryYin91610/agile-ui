<template lang="pug">
div.agile-carousel-item(
  :class="[{active: isActive, 'pre-active': !isActive && isPreActive,  hidden: !show || (!isVisible && mode === 'card'), animating: ready}, mode]",
  :style="{ width: getSize(width), transform: transformStyle }",
  @click="onClick")
  slot
  transition(name="item-mask")
    div.mask(v-if="platform === 'h5' && !isActive")
</template>

<style src="./style/item-pc.styl" lang="stylus" scoped></style>

<style src="./style/item-h5.styl" lang="stylus" scoped></style>

<script>
import { pxToRem } from '../lib/util'

export default {
  name: 'agile-carousel-item',
  data () {
    return {
      isVisible: false,
      isPreActive: false,
      isActive: false,
      ready: false,
      show: true,
      offsetX: 0,
      transformStyle: 'none'
    }
  },
  created () {
    this.$parent && this.$parent.updateItems()
  },
  methods: {
    getSize (size) {
      return this.platform === 'h5' ? `${pxToRem(size)}rem` : `${size}px`
    },
    translateItemByArrow (index, oldIndex) {
      this.ready = false
      const total = this.$parent.$data.items.length
      const unitWidth = this.$parent.$props.width
      const direction = this.$parent.$data.direction
      if (total === 2 && direction) {
        if (oldIndex === 0) {
          if (index === oldIndex) {
            this.offsetX = 0
          } else {
            this.offsetX = direction === 1 ? -2 * unitWidth : 0
          }
        }
        if (oldIndex === 1) {
          if (index === 1) {
            this.offsetX = -1 * unitWidth
          } else {
            this.offsetX = -1 * direction * unitWidth
          }
        }
      } else {
        this.offsetX = -1 * oldIndex * unitWidth
        if (oldIndex === 0 && index === total - 1) {
          this.offsetX = -1 * (index + 1) * unitWidth
        } else if (oldIndex === total - 1 && index === 0) {
          this.offsetX = unitWidth
        }
      }
      if (index === oldIndex) {
        this.isVisible = true
        this.isPreActive = true
      } else {
        this.isPreActive = false
        if (oldIndex === 0) {
          this.isVisible = index === 1 || index === total - 1
        } else if (oldIndex === total - 1) {
          this.isVisible = index === total - 2 || index === 0
        } else {
          this.isVisible = index === oldIndex - 1 || index === oldIndex + 1
        }
      }
      this.adjustPosX(this.offsetX)
    },
    translateItemByIndicator (index, activeIndex, oldIndex) {
      const unitWidth = this.$parent.$props.width
      const direction = this.$parent.$data.direction
      if (index === activeIndex) {
        this.show = false
        this.ready = false
        this.offsetX = (-1 * index - direction) * unitWidth
        this.adjustPosX(this.offsetX)
      }
      if (index === oldIndex) {
        this.show = true
        this.ready = false
        this.offsetX = -1 * index * unitWidth
      }
    },
    adjustPosX (offsetX) {
      let transform = offsetX ? `translateX(${this.getSize(offsetX)})` : ''
      if (this.mode === 'card') {
        const scale = this.isActive ? 1.18 : 1
        transform += ` scale(${scale})`
      }
      this.transformStyle = transform
    },
    onClick () {
      if (this.isActive) {
        this.$parent.$emit('clickcard')
      }
    }
  },
  computed: {
    mode () {
      return this.$parent.$props.type
    },
    platform () {
      return this.$parent.$props.platform
    },
    width () {
      return this.$parent.$props.width
    }
  }
}
</script>
