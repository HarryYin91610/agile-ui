<template lang="pug">
div.agile-sidebar(
  :style="[wrapStyle, wrapTranslate]")
  div.navbar-main.bg-img-normal.bg-img-contain(ref="sidebarBody", :style="bodyStyle")
    nav-item(
      v-for="(nItem, index) in setting",
      :mode="mode",
      :cur-pos="curPos",
      :hover="hover",
      :index="index",
      :scrolling="scrolling",
      :setting="nItem",
      :custom="item", 
      @onhover="onHover",
      @scrollto="onScrollTo",
      @startscroll="scrolling = true",
      @endscroll="scrolling = false"
      :key="`nav-${index + 1}`")
    div.to-top.bg-img-normal.bg-img-contain(
      v-if="showToTop", :style="toTopStyle", 
      @mouseenter="hoverTop = true", @mouseleave="hoverTop = false", @click="moveToTop")
      | {{ toTop.content }}
  div.close.bg-img-normal.bg-img-contain(
    v-if="showClose",
    :style="closeStyle", :class="{closed: !userShow}", 
    @click="toClose")
    div.close-arrow.bg-img-normal.bg-img-contain(:style="arrowStyle")
      arrow-svg(v-if="close && close.arrow && close.arrow.mode === 'color'")

</template>

<style lang="stylus" scoped> 
// 默认样式
$bodyWidth = 150px
$bodyHeight = 300px
$wrapRight = 42px
$closeWidth = 22px
$closeHeight = 100px
$closeLeft = -22px
$closeBg = #1E90FF
$closeArrow = #ffffff
$topWidth = 85px
$topHeight = 30px
$topBg = #00BFFF
$topColor = #ffffff

.navwrap-enter-active,.navwrap-leave-active
  transition opacity 0.05s
.navwrap-enter,.navwrap-leave-active
  opacity 0

.bg-img-normal
  background-position center
  background-repeat no-repeat
.bg-img-contain
  background-size contain
.bg-img-cover
  background-size cover

.agile-sidebar
  position fixed
  right $wrapRight
  top 50%
  margin-top -($bodyHeight/2)
  transform translate(0, 0)
  transition all 0.35s
  z-index 1000
  .navbar-main
    position relative
    width $bodyWidth 
    height  $bodyHeight
    box-sizing border-box
    font-size 18px
    background-color #1E90FF
      
    .to-top
      position absolute
      left 50%
      bottom -$topHeight
      width $topWidth 
      height $topHeight
      line-height $topHeight
      color $topColor
      background-color $topBg
      text-align center
      cursor pointer
      transform translateX(-50%)
    
  .close
    position absolute
    left $closeLeft 
    top 50%
    width $closeWidth
    height  $closeHeight 
    background-color $closeBg
    transform translateY(-50%)
    transition all 0.35s
    cursor pointer
    .close-arrow 
      position absolute 
      left 50%
      top 50%
      fill $closeArrow
      transform translate(-50%, -50%)
      transform translate3d(-50%, -50%, 0)
      transition all 0.15s
    &.closed .close-arrow
      transform translate(-50%, -50%) scaleX(-1)
      transform translate3d(-50%, -50%, 0) scaleX(-1)

</style>

<script>
import NavItem from './item.vue'
import ArrowSvg from './arrow-svg.vue'

import { isVisible } from '../lib/util'
import { moveScreenTo } from '../lib/scroll'

// 默认尺寸和坐标
const bodyWidth = 150
const bodyHeight = 300
const wrapRight = 42
const closeWidth = 22

export default {
  name: 'agile-sidebar',
  props: {
    mode: {
      type: String,
      default: 'normal' // normal or advanced
    },
    setting: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    body: {
      type: Object,
      default () {
        return {
          mode: 'color', // color or image
          bgColor: '', // mode为color才生效
          bgSrc: '', // mode为image才生效
          width: 0,
          height: 0,
          padding: 0
        }
      }
    },
    item: {
      type: Object,
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
    },
    close: {
      type: Object,
      default () {
        return {
          show: true,
          width: 0,
          height: 0,
          left: 0,
          top: 0,
          background: {
            mode: 'color', // color or image
            bgColor: '', // mode为color才生效
            bgSrc: '', // mode为image才生效
          },
          arrow: {
            width: 0,
            height: 0,
            mode: 'color', // color or image
            arColor: '', // mode为color才生效
            arSrc: '', // mode为image才生效
          }
        }
      }
    },
    toTop: {
      type: Object,
      default () {
        return {
          show: true,
          width: 0,
          height: 0,
          content: 'to top',
          pos: {
            left: 0,
            bottom: 0
          },
          font: {
            size: 0,
            normal: '',
            active: ''
          },
          background: {
            mode: 'color', // color or image
            bgColor: '', // mode为color才生效
            bgSrc: '' // mode为image才生效
          }
        }
      }
    }
  },
  data () {
    return {
      scrolling: false,
      posShow: false,
      userShow: true,
      curPos: -1,
      hover: -1,
      hoverTop: false,
      scrollTimer: null // 滚动条防抖时间戳
    }
  },
  methods: {
    async moveToTop () {
      this.scrolling = true
      const curScroll = document.documentElement.scrollTop || document.body.scrollTop
      await moveScreenTo(curScroll, 0, 100)
      this.curPos = -1
      this.scrolling = false
      this.posShow = false
    },
    toClose () {
      this.userShow = !this.userShow
    },
    findCurIndex () {
      let find = -1
      this.setting.some((navItem, index) => {
        if (isVisible(document.getElementById(navItem.id))) {
          find = index
          return true
        }
        return false
      })
      this.curPos = find > -1 ? find : -1
    },
    onScrollTo (index) {
      this.curPos = index
    },
    onHover (index) {
      this.hover = index
    }
  },
  mounted () {
    // 监听浏览器滚动条事件
    window.onscroll = () => {
      if (this.scrolling) { return }
      window.clearTimeout(this.scrollTimer)
      this.scrollTimer = window.setTimeout(() => {
        const scrolltop = document.documentElement.scrollTop || document.body.scrollTop
        this.posShow = scrolltop > 200
        this.findCurIndex()
      }, 50)
    }
  },
  beforeDestroy () {
    window.onscroll = null
  },
  computed: {
    wrapStyle () {
      if (this.mode === 'advanced' && this.body) {
        const marginTop = `-${(this.body.height || bodyHeight)/2}px`
        return {
          marginTop
        }
      } else {
        return null
      }
    },
    wrapTranslate () {
      let offsetX = 0
      const bwidth = this.body && this.body.width ? this.body.width : bodyWidth
      const cwidth = this.close && this.close.width ? this.close.width : closeWidth
      if (!this.posShow) {
        offsetX = wrapRight + bwidth + cwidth
      } else if (!this.userShow) {
        offsetX = wrapRight + bwidth
      }
      return {
        transform: `translateX(${offsetX}px)`
      }
    },
    bodyStyle () {
      if (this.mode === 'advanced' && this.body) {
        const width = `${this.body.width || bodyWidth}px`
        const height = `${this.body.height || bodyHeight}px`
        const paddingTop = `${this.body.paddingTop || 0}px`

        const obj = {
          width,
          height,
          paddingTop
        }

        if (this.body.mode === 'image') {
          obj.backgroundImage = `url(${this.body.bgSrc})`
          obj.backgroundColor = 'transparent'
        } else {
          obj.backgroundImage = 'none'
          obj.backgroundColor = this.body.bgColor
        }
        return obj
      } else {
        return null
      }
    },
    closeStyle () {
      if (this.mode === 'advanced' && this.close) {
        const width = `${this.close.width || 0}px`
        const height = `${this.close.height || 0}px`
        const left = `${this.close.left || 0}px`
        const top = this.close.top ? `${this.close.top}px` : '50%'
        let backgroundImage = 'none'
        let backgroundColor = 'transparent'
        if (this.close.background && this.close.background.mode === 'image' && this.close.background.bgSrc) {
          backgroundImage = `url(${this.close.background.bgSrc})`
        } else if (this.close.background && this.close.background.mode === 'color' && this.close.background.bgColor) {
          backgroundColor = this.close.background.bgColor
        }
        return {
          width,
          height,
          left,
          top,
          backgroundImage,
          backgroundColor
        }
      } else {
        return null
      }
    },
    arrowStyle () {
      if (this.mode === 'advanced' && this.close && this.close.arrow) {
        const width = `${this.close.arrow.width || 0}px`
        const height = `${this.close.arrow.height || 0}px`
        let backgroundImage = 'none'
        let fill = 'none'
        if (this.close.arrow.mode === 'image' && this.close.arrow.arSrc) {
          backgroundImage = `url(${this.close.arrow.arSrc})`
        } else if (this.close.arrow.mode === 'color' && this.close.arrow.arColor) {
          fill = this.close.arrow.arColor
        }
        return {
          width,
          height,
          backgroundImage,
          fill
        }
      } else {
        return null
      }
    },
    toTopStyle () {
      if (this.mode === 'advanced' && this.toTop) {
        const width = `${this.toTop.width || 0}px`
        const height = `${this.toTop.height || 0}px`
        const left = this.toTop.pos && this.toTop.pos.left ? `${this.toTop.pos.left}px` : '50%'
        const bottom = this.toTop.pos && this.toTop.pos.bottom ? `${this.toTop.pos.bottom}px` : 0
        const fontSize = this.toTop.font && this.toTop.font.size ? `${this.toTop.font.size}px` : 16
        const normalColor = this.toTop.font && this.toTop.font.normal ? this.toTop.font.normal : '#696969'
        const activeColor = this.toTop.font && this.toTop.font.active ? this.toTop.font.active : '#ffffff'
        let backgroundImage = 'none'
        let backgroundColor = 'transparent'
        if (this.toTop.background && this.toTop.background.mode === 'image' && this.toTop.background.bgSrc) {
          backgroundImage = `url(${this.toTop.background.bgSrc})`
        } else if (this.toTop.background && this.toTop.background.mode === 'color' && this.toTop.background.bgColor) {
          backgroundColor = this.toTop.background.bgColor
        }
        return {
          width,
          height,
          lineHeight: height,
          left,
          bottom,
          fontSize,
          color: this.hoverTop ? activeColor : normalColor,
          backgroundImage,
          backgroundColor
        }
      } else {
        return null
      }
    },
    showClose () {
      return this.close && typeof this.close.show === 'boolean' ? this.close.show : true
    },
    showToTop () {
      return this.toTop && typeof this.toTop.show === 'boolean' ? this.toTop.show : true
    }
  },
  components: {
    ArrowSvg,
    NavItem
  }
}
</script>