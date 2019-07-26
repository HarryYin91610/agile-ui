<template lang="pug">
div.agile-carousel-item(
  :class="[{active: isActive, 'pre-active': !isActive && isPreActive,  hidden: !show || (!isVisible && mode === 'card'), animating: ready}, mode]", 
  :style="{ width: `${width}px`, transform: transformStyle }")
  slot
</template>

<style lang="stylus" scoped>
.agile-carousel-item
  position relative
  width 100%
  flex none
  &.card
    transition all 0.35s
    z-index 0
    &.pre-active
      z-index 1
    &.active
      z-index 2
  &.animating
    transition transform 0.35s
    transition-delay 0.05s
    // z-index -1
  &.hidden
    visibility hidden 

</style>

<script>
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
      let transform = offsetX ? `translateX(${offsetX}px)` : ''
      if (this.mode === 'card') {
        const scale = this.isActive ? 1.25 : 1
        transform += ` scale(${scale})`
      }
      this.transformStyle = transform
    }
  },
  computed: {
    mode () {
      return this.$parent.$props.type
    },
    width () {
      return this.$parent.$props.width
    }
  }
}
</script>
