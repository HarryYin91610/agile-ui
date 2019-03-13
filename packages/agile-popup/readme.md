# Agile Popup 

>By HarryYin on 2018.08.01.

* 一款通用弹框组件基于 vue2.0+
* 两种模式生成弹框：调用函数 或 使用vue组件

## Quick Start

* step1. 全局注册
```javascript
import Vue from 'vue'
import AgilePopup from './agile-popup/index.js'

Vue.use(AgilePopup)
```
* step2. 弹框配置
```javascript
let popSetting = {
    // 控制弹框显示
    show: {
      type: Boolean,
      default: false
    },
    // 控制弹框定位--默认true相对于浏览器定位，false相对于已定位的父元素
    fixed: {
      type: Boolean,
      default: true
    },
    // 弹框外壳
    shell: {
      type: Object,
      default () {
        return {
          style: {} // 可自定义行内样式覆盖
        }
      }
    },
    // 弹框标题内容，可插入html内容
    mainText: {
      type: Object,
      default () {
        return {
          template: '',
          style: {}, // 可自定义行内样式覆盖
          show: true
        }
      }
    },
    // 叉字按钮配置
    close: {
      type: Object,
      default () {
        return {
          disabled: false,
          show: true,
          outerStyle: {}, // 可自定义按钮外壳样式
          innerStyle: {}, // 可自定义按钮图标样式,通过fill属性可修改叉号填色
          callback: () => {}
        }
      }
    },
    // 按钮1配置
    btn1: {
      type: Object,
      default () {
        return {
          text: 'btn1',
          disabled: false,
          show: true,
          type: 'light', // 按钮的类型
          style: {}, // 可自定义行内样式覆盖
          callback: () => {}
        }
      }
    },
    // 按钮2配置
    btn2: {
      type: Object,
      default () {
        return {
          text: 'btn2',
          disabled: false,
          show: true,
          type: 'dark', // 按钮的类型
          style: {}, // 可自定义行内样式覆盖
          callback: () => {}
        }
      }
    }
}
```

* step3. 使用方式：function
```javascript
// 在组件中通过调用函数可生成任意多个弹框
this.$agilePopup(popSetting, parentNode = null)

/*
   参数说明：
   popSetting： 可参考step2
   parentNode： 已定位的祖先元素（用户使用非fixed定位时，弹框将会相对于该祖先节点进行定位。）  */
```

* step3. 使用方式：template
```html
  <!--一个模板只会生成一个弹框-->
  <agile-template 
    :show="temPopShow" 
    :fixed="temPopSetting.fixed" 
    :main-text="temPopSetting.mainText" 
    :shell="temPopSetting.shell" 
    :close="temPopSetting.close"
    :btn1="temPopSetting.btn1" 
    :btn2="temPopSetting.btn2">
      <!--可插入slot内容-->
      <slot-content></slot-content>
  </agile-template>
  <!--
    相关属性可参考step2中的popSetting
  -->
```

