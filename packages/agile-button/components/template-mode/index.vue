<template lang="pug">
div.agile-button-wrap(
  :class="[type, {disabled: disabled, inline: inline, hover: isHover, active: active || isActive}]", 
  :style="syncStyle",
  @mouseenter="isHover = true", @mouseleave="isHover = false",
  @mousedown="isActive = true", @mouseup="isActive = false"
)
  div.custom-bg-wrap(
    v-if="type === 'custom'", 
    :style="customBg ? {backgroundImage: `url(${customBg})`} : null"
  )

  div.text-wrap(:style="textColor ? {color: textColor} : null")
    | {{ content }}

</template>

<style lang="stylus" scoped>
.agile-button-wrap
  position relative
  width 147px 
  height 40px
  margin 0 auto 10px
  line-height 40px
  text-align center
  font-size 16px 
  font-weight bold
  color #000000
  border-radius 5px
  cursor pointer
  transition all 0.35s
  &.normal
    color #ffffff
    background-color #1E90FF
    &.hover:not(.disabled), &.active:not(.disabled)
      background-color #00BFFF
  &.inline
    display inline-block
    vertical-align middle
    margin-right 2px 
    &:last-child 
      margin-right 0
  &.disabled
    cursor not-allowed 

  .custom-bg-wrap
    position absolute
    left 0
    top 0
    width 100% 
    height 100%
    background-repeat no-repeat 
    background-position center 
    background-size contain  
    transition all 0.35s
    
  
  .text-wrap 
    position relative

</style>

<script>
export default {
  name: 'agile-button',
  props: {
    type: {
      type: String,
      default: 'normal' // custom -> 自定义背景
    },
    content: {
      type: String,
      default: '默认文案'
    },
    inline: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    text: {
      type: Object,
      default () {
        return {
          normal: '#ffffff',
          hover: '#ffffff',
          active: '#ffffff',
          disabled: '#ffffff'
        }
      }
    },
    background: {
      type: Object,
      default () {
        return {
          normal: '',
          hover: '',
          active: '',
          disabled: ''
        }
      }
    },
    width: {
      type: Number,
      default: 147
    },
    height: {
      type: Number,
      default: 40
    },
    userStyle: {}
  },
  data () {
    return {
      isHover: false,
      isActive: false
    }
  },
  computed: {
    textColor () {
      if (!this.text) { return '#ffffff' }
      if (this.disabled) {
        return this.text.disabled ? this.text.disabled : this.text.normal
      }
      if ((this.active || this.isActive) && this.text.active) {
        return this.text.active
      }
      if (this.isHover && this.text.hover) {
        return this.text.hover
      }
      return this.text.normal
    },
    customBg () {
      if (!this.background) { return '' }
      if (this.disabled) {
        return this.background.disabled ? this.background.disabled : this.background.normal
      }
      if ((this.active || this.isActive) && this.background.active) {
        return this.background.active
      }
      if (this.isHover && this.background.hover) {
        return this.background.hover
      }
      return this.background.normal
    },
    defaultStyle () {
      let obj = {
        width: '0px',
        height: '0px'
      }
      if (this.width > 0) {
        obj.width = `${this.width}px`
      }
      if (this.height > 0) {
        obj.height = `${this.height}px`
        obj.lineHeight = `${this.height}px`
      }
      if (this.type === 'normal' && this.customBg) {
        obj.backgroundColor = this.customBg
      }
      return obj
    },
    syncStyle () {
      return Object.assign(this.defaultStyle, this.userStyle)
    }
  }
}
</script>
