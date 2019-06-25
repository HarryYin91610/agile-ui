<template lang="pug">
div.agile-func-toast(v-if="show", :class="curStatus", v-html="content", :style="syncStyle")
</template>

<style lang="stylus">
@keyframes toast-appear
  from
    opacity 0
    transform translate3d(0, 50%, 0)

@keyframes toast-disappear
  to 
    opacity 0
    transform translate3d(0, -50%, 0)

@keyframes toast-center-appear
  from
    opacity 0
    transform translate3d(-50%, 50%, 0)

@keyframes toast-center-disappear
  to 
    opacity 0
    transform translate3d(-50%, -70%, 0)

.agile-func-toast
  position fixed
  left 0
  top 0
  display block
  padding 10px 20px
  line-height 24px
  text-align left
  white-space nowrap
  font-size 14px
  letter-spacing 0
  font-weight normal
  color #696969
  background #BBFFFF
  border-radius 10px
  box-shadow 5px 5px 10px 0 rgba(0, 0, 0, 0.15)
  box-sizing border-box
  transition all 0.35s
  z-index 5
  &.center
    left 50%
    top 50%
    transform translate3d(-50%, -50%, 0)
    &.show
      animation toast-center-appear 0.35s ease-in-out 1 both
    &.hidden
      animation toast-center-disappear 0.35s ease-in-out 1 both
  &.show
    animation toast-appear 0.35s ease-in-out 1 both
  &.hidden
    animation toast-disappear 0.35s ease-in-out 1 both

  .toast-title
    margin-bottom 19px
    font-size 22px
    font-weight bold
    color #00BFFF

  .toast-line
    line-height 20px
</style>

<script>
export default {
  name: 'agile-func-toast',
  data () {
    return {
      // 控制toast显示
      show: true,
      // 指定toast显示多少时间后消失
      timeout: 0,
      // 自定义行内样式
      userStyle: null,
      // 可插入的文本或html内容
      content: '',
      // 指定toast位置的参照元素
      parentNode: null,
      // 指定toast相对于parentNode偏移的位置
      // x>0: 向右偏移, x<0: 向左偏移
      // y>0: 向下偏移, y<0: 向上偏移
      offset: { 
        x: 0,
        y: 0
      }
    }
  },
  methods: {
    startTimer () {
      const ts = this.timeout
      if (ts >= 0) {
        window.setTimeout(() => {
          this.timeout = 0
          window.setTimeout(() => {
            // 销毁
            this.show = false
          }, 350)
        }, ts)
      }
    },
    setToastPos () {
      const rect = this.parentNode.getBoundingClientRect()
      const temp = {
        left: `${rect.left}px`,
        top: `${rect.top}px`
      }
      if (this.offset) {
        this.adjustToastPos(temp, rect)
      }
      return temp
    },
    adjustToastPos (temp, rect) {
      temp.left = `${rect.left + this.offset.x}px`
      temp.top = `${rect.top + this.offset.y}px`
    }
  },
  mounted () {
    this.startTimer()
  },
  computed: {
    curStatus () {
      const res = this.timeout > 0 ? 'show' : 'hidden'
      const center = this.center ? 'center' : ''
      return [res, center]
    },
    defaultStyle () {
      if (this.parentNode) {
        let pos = {
          left: '0',
          top: '0'
        }
        pos = this.setToastPos()
        return pos
      }
      return {}
    },
    syncStyle () {
      return Object.assign(this.defaultStyle, this.userStyle)
    },
    center () {
      return !Boolean(this.parentNode)
    }
  }
}
</script>
