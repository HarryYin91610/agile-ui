## Button 按钮

具备常用功能的按钮，可根据需求改变样式。

### 基础用法

<script>
export default {
  data () {
    return {
      text1: {
        normal: '#ffffff',
        hover: '#FFBBFF',
        active: '',
        disabled: ''
      },
      background1: {
        normal: '#FF82AB',
        hover: '#FF34B3',
        active: '',
        disabled: '#FFB5C5'
      },
      text2: {
        normal: '#ffffff',
        hover: '#ffffff',
        active: '#ffffff',
        disabled: 'rgb(141, 161, 169)'
      },
      background2: {
        normal: require('./assets/btn-normal.png'),
        hover: require('./assets/btn-hover.png'),
        active: require('./assets/btn-active.png'),
        disabled: require('./assets/btn-disabled.png')
      }
    }
  },
  methods: {
    onClick () {
      const parentNode = this.$refs.agileBtn.$el
      this.$agileToast({
        timeout: 750,
        offset: {
          x: parentNode.getBoundingClientRect().width + 5,
          y: 0
        },
        content: '点我做啥？！',
        parentNode
      })
    }
  }
}
</script>

:::demo 使用`content`属性来设置按钮文案
```html
<agile-button content="点击我" @click.native="onClick" ref="agileBtn"></agile-button>
```
:::

### 禁用按钮

:::demo 使用`disabled`属性来禁用按钮
```html
<agile-button disabled></agile-button>
```
:::

### 行内按钮

:::demo 使用`inline`属性显示为行内按钮
```html
<agile-button inline></agile-button>
<agile-button inline></agile-button>
<agile-button inline></agile-button>
```
:::

### 自定义大小的按钮

:::demo 通过`width`和`height`属性改变按钮大小
```html
<agile-button :width="200"></agile-button>
<agile-button :width="200" :height="60"></agile-button>
<agile-button :width="300" :height="60"></agile-button>
```
:::

### 自定义颜色的按钮

:::demo 
```html
<script>
export default {
  data () {
    return {
      text1: {
        normal: '#ffffff',
        hover: '#FFBBFF',
        active: '',
        disabled: ''
      },
      background1: {
        normal: '#FF82AB',
        hover: '#FF34B3',
        active: '',
        disabled: '#FFB5C5'
      }
    }
  } 
}
</script>
<agile-button type="normal" :text="text1" :background="background1" ></agile-button>
<agile-button disabled type="normal" :text="text1" :background="background1" ></agile-button>
```
:::

### 自定义背景图片

:::demo 设置`type`属性为`custom`; 设置`text`属性，4种显示状态的文字颜色; 设置`background`属性，4种显示状态的图片url; 设置`btn-style`属性自定义样式调整宽高
```html
<script>
export default {
  data () {
    return {
      text2: {
        normal: '#ffffff',
        hover: '#ffffff',
        active: '#ffffff',
        disabled: '#000000'
      },
      background2: {
        normal: require('./assets/btn-normal.png'),
        hover: require('./assets/btn-hover.png'),
        active: require('./assets/btn-active.png'),
        disabled: require('./assets/btn-disabled.png')
      }
    }
  }
}
</script>

<agile-button type="custom" :text="text2" :background="background2" :user-style="{width: '147px', height: '53px', lineHeight: '53px'}">
</agile-button>
<agile-button type="custom" :text="text2" :background="background2" :user-style="{width: '147px', height: '53px', lineHeight: '53px'}" disabled>
</agile-button>
```
:::

### Options
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------------- |--------------------------------  |-------- |
| type | 设置为“custom”可以自定义背景图片 | String | normal / custom | normal |
| content | 按钮文案 | String | — | 默认文案 |
| inline | 设置为“true”可以让按钮为行内元素 | Boolean | true / false | false |
| disabled | 设置为“true”可以让按钮为禁用态 | Boolean | true / false | false |
| active | 设置为“true”可以让按钮为选中态 | Boolean | true / false | false |
| width | 设置按钮宽度（如果设置了行内样式，会被覆盖） | Number | — | 147 |
| height | 设置按钮高度（如果设置了行内样式，会被覆盖） | Number | — | 40 |
| text | 设置按钮文案在常态、hover、active、disabled时的颜色 | { normal: “”, hover: “”, active: “”, disabled: “” } | — | — |
| background | 设置背景在常态、hover、active、disabled时的自定义颜色或者图片（type为“normal”只有颜色生效，type为“custom”只有图片生效，） | { normal: “”, hover: “”, active: “”, disabled: “” } | — | — |
| userStyle | 自定义行内样式 | Object | — | — |