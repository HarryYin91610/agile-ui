<template lang="pug">
div.agile-carousel-item(:class="{hidden: !show, animating: ready}", :style="itemStyle")
  slot
</template>

<style lang="stylus" scoped>
.agile-carousel-item 
  width 100%
  flex none
  &.animating 
    transition transform 0.35s
    transition-delay 0.05s
  &.hidden 
    visibility hidden
</style>

<script>
export default {
  name: 'agile-carousel-item',
  data () {
    return {
      ready: false,
      show: true,
      offsetX: 0,
      itemStyle: {}
    }
  },
  created () {
    this.$parent && this.$parent.updateItems()
  },
  methods: {
    translateItemByArrow (index, activeIndex, oldIndex) {
      this.show = index === oldIndex
      this.ready = false
      const total = this.$parent.items.length
      const unitWidth = this.$parent.$el.offsetWidth
      const direction = this.$parent.direction
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
      this.adjustPosX(this.offsetX)
    },
    translateItemByIndicator (index, activeIndex, oldIndex) {
      const unitWidth = this.$parent.$el.offsetWidth
      const direction = this.$parent.direction
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
      this.itemStyle = offsetX ? {
        transform: `translateX(${offsetX}px)`
      } : null
    }
  }
}
</script>
