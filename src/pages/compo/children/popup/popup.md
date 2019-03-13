## Popup 弹框

通用弹框，内部插入子组件填充内容，可根据需求改变样式。

<script>
import DemoInner from './demo-inner.vue'

export default {
  components: {
    DemoInner
  },
  methods: {
    onClick1 () {
      this.$agilePopup()
    },
    onClick2 () {
      this.$agilePopup({
        mask: {
          show: false
        }
      })
    },
    onClick3 () {
      this.$agilePopup({
        mask: {
          color: '#4682B4'
        }
      })
    },
    onClick4 () {
      this.$agilePopup({
        background: {
          color: '#FFD700'
        }
      })
    },
    onClick5 () {
      this.$agilePopup({
        width: 447,
        background: {
          type: 'image'
        },
        bgTop: {
          height: 23,
          src: require('./assets/popup-top.png')
        },
        bgBottom: {
          height: 26,
          src: require('./assets/popup-bottom.png')
        },
        bgMid: {
          src: require('./assets/popup-mid.png')
        },
        close: {
          inner: {
            color: {
              normal: '#4d4d4d',
              hover: '#ffc13b'
            }
          },
          outer: {
            right: 21,
            top: 21
          }
        }
      })
    },
    onClick6 () {
      this.$agilePopup({
        close: {
          inner: {
            size: 30,
            lineWidth: 10,
            color: {
              normal: '#00BFFF',
              hover: '#ffffff'
            }
          }
        }
      })
    },
    onClick7 () {
      this.$agilePopup({
        close: {
          outer: {
            right: 10,
            top: 10,
            size: 50,
            color: '#00BFFF'
          }
        }
      })
    },
    onClick8 () {
      this.$agilePopup({
        background: {
          color: 'none'
        },
        close: {
          inner: {
            color: {
              normal: '#1E90FF',
              hover: '#00BFFF'
            }
          }
        },
        component: DemoInner,
        componentName: 'demo-inner',
        innerData: {
          text: '这样可以从调用弹框处插入数据到子组件里'
        }
      })
    }
  }
}
</script>

### 基础用法

:::demo
```html
<script>
export default {
  methods: {
    onClick1 () {
      this.$agilePopup()
    }
  }
}
</script>

<agile-button content="点击我" @click.native="onClick1" ></agile-button>
```
:::

### 配置背景蒙层

:::demo
```html
<script>
export default {
  methods: {
    onClick2 () {
      this.$agilePopup({
        mask: {
          show: false
        }
      })
    },
    onClick3 () {
      this.$agilePopup({
        mask: {
          color: '#4682B4'
        }
      })
    }
  }
}
</script>

<agile-button content="去掉背景蒙层" @click.native="onClick2" ></agile-button>
<agile-button content="改变背景蒙层颜色" :width="200" @click.native="onClick3" ></agile-button>
```
:::

### 配置弹框颜色

:::demo
```html
<script>
export default {
  methods: {
    onClick4 () {
      this.$agilePopup({
        background: {
          color: '#FFD700'
        }
      })
    }
  }
}
</script>

<agile-button content="点击我" @click.native="onClick4" ></agile-button>
```
:::

### 自定义弹框背景

:::demo 通过`width`设置弹框宽度；通过将`background`的`type`属性改为`image`使背景图片生效；通过`bgTop` `bgBottom` `bgMid`设置背景图的上、中、下部分（上和下部分为固定高度，可通过`height`设置；中间部分为垂直平铺的图案，整个弹框可根据子组件内容自适应改变整体高度）
```html
<script>
export default {
  methods: {
    onClick5 () {
      this.$agilePopup({
        width: 447,
        background: {
          type: 'image'
        },
        bgTop: {
          height: 23,
          src: require('./assets/popup-top.png')
        },
        bgBottom: {
          height: 26,
          src: require('./assets/popup-bottom.png')
        },
        bgMid: {
          src: require('./assets/popup-mid.png')
        },
        close: {
          inner: {
            color: {
              normal: '#4d4d4d',
              hover: '#ffc13b'
            }
          },
          outer: {
            right: 21,
            top: 21
          }
        }
      })
    }
  }
}
</script>

<agile-button content="点击我" @click.native="onClick5" ></agile-button>
```
:::

### 配置弹框关闭按钮

:::demo 改变定位通过配置`close.outer`的`right`和`top`；改变X的颜色通过配置`close.inner.color`的`normal`和`hover`；改变X的大小通过配置`close.inner.size`。
```html
<script>
export default {
  methods: {
    onClick6 () {
      this.$agilePopup({
        close: {
          inner: {
            size: 30,
            lineWidth: 10,
            color: {
              normal: '#00BFFF',
              hover: '#ffffff'
            }
          }
        }
      })
    },
    onClick7 () {
      this.$agilePopup({
        close: {
          outer: {
            right: 10,
            top: 10,
            size: 50,
            color: '#00BFFF'
          }
        }
      })
    }
  }
}
</script>

<agile-button content="改变X样式" @click.native="onClick6" ></agile-button>
<agile-button content="改变X外部样式" @click.native="onClick7" ></agile-button>
```
:::

### 插入自定义子组件

:::demo 通过配置`component`和`componentName`可以插入自定义子组件；通过配置`innerData`可以插入数据到子组件的同名属性（子组件需要手动设置同名属性）；在子组件里通过触发`closepopup`事件可以控制关闭弹框组件。
```html
<script>

/* 调用弹框 */

import DemoInner from './demo-inner.vue'

export default {
  methods: {
    onClick8 () {
      this.$agilePopup({
        background: {
          color: 'none'
        },
        close: {
          inner: {
            color: {
              normal: '#1E90FF',
              hover: '#00BFFF'
            }
          }
        },
        component: DemoInner,
        componentName: 'demo-inner',
        innerData: {
          text: '这样可以从调用弹框处插入数据到子组件里'
        }
      })
    }
  },
  components: {
    DemoInner
  }
}
</script>

<agile-button content="点击我" @click.native="onClick8" ></agile-button>

<script>

/* 子组件内部 */

export default {
  props: ['innerData'],
  methods: {
    closePop () {
      this.$emit('closepopup')
    }
  }
}
</script>
```
:::

### Options
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------------- |--------------------------------  |-------- |
| width | 设置弹框宽度 | Number | — | 433 |
| mask | 配置背景蒙层 | { show: Boolean, color: String } | — | { show: true, color: “#000000” } |
| background | 配置弹框背景 | { type: String, color: String } | type: color / image | { type: “color”, color: “#1E90FF” } |
| bgTop | 配置背景图片顶部（background.type为“image”时才生效） | { height: Number, src: String } | — | { height: 50, src: “” } |
| bgBottom | 配置背景图片底部（background.type为“image”时才生效） | { height: Number, src: String } | — | { height: 50, src: “” } |
| bgMid | 配置背景图片中间平铺的部分（background.type为“image”时才生效） | { src: String } | — | { src: “” } |
| close | 配置关闭按钮 | { show: Boolean, inner: Object, outer: Object } | — | { show: true } |
| close.inner | 配置关闭按钮内部X部分 | { size: Number, lineWidth: Number, color: Object } | — | { size: 20, lineWidth: 6 } |
| close.inner.color | 配置X部分的颜色（包括常态和hover态） | { normal: String, hover: String } | — | { normal: “#ffffff”, hover: “#ffffff” } |
| close.outer | 配置关闭按钮外部 | { right: Number, top: Number, size: Number, color: String } | — | { right: 13, top: 13, size: 20, color: “none” } |
| component | 插入的子组件 | vue组件实例 | — | — |
| componentName | 插入的子组件名 | String | — | — |
| innerData | 传给子组件的同名属性 | Object | — | — |
