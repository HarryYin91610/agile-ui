<template lang="pug">
div.agile-info-icon(:style="customStyle", @click="afterClick", @mouseenter="afterHover", @mouseleave="afterMouseLeave")
  info-icon
</template>

<script>
import InfoIcon from '../info-icon/index.vue'

export default {
  name: 'agile-info-icon',
  props: {
    // 设置icon鼠标hover图形
    pointer: {
      type: String,
      default: ''
    },
    // 设置icon填充色
    color: {
      type: String,
      default: ''
    },
    // 设置icon尺寸（宽和高一致）
    size: {
      type: Number,
      default: 21
    },
    // 设置icon位置（相对于其最近的已定位的祖先元素）
    // pos={x: string, y: string}
    pos: {
      type: Object,
      default () {
        return {}
      }
    },
    // 设置用户click操作回调
    onClick: {
      type: Function,
      default () {
        return null
      }
    },
    // 设置用户hover操作回调
    onHover: {
      type: Function,
      default () {
        return null
      }
    },
    // 设置用户鼠标移出icon回调
    onBlur: {
      type: Function,
      default () {
        return null
      }
    }
  },
  methods: {
    afterClick () {
      if (this.onClick) {
        this.onClick()
      }
    },
    afterHover () {
      if (this.onHover) {
        this.onHover()
      }
    },
    afterMouseLeave () {
      if (this.onBlur) {
        this.onBlur()
      }
    }
  },
  computed: {
    customStyle () {
      const obj = {}

      obj.width = `${this.size}px`
      obj.height = `${this.size}px`

      obj.cursor = this.pointer ? this.pointer : 'pointer'

      obj.fill = this.color ? this.color : '#00BFFF'

      obj.left = this.pos.x ? this.pos.x : '0px'
      obj.top = this.pos.y ? this.pos.y : '0px'

      return obj
    }
  },
  components: {
    InfoIcon
  }
}
</script>

<style lang="stylus" scoped>
.agile-info-icon
  position absolute
</style>
