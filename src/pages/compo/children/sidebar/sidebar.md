## Sidebar 侧边栏

用于页面滚动导航。

<script>
import navSetting from './const/navbar-setting'

export default {
  data () {
    return {
      mode: 'normal', // normal or advanced
      navSetting,
      text: {
        normal: '#ffffff',
        hover: '#ffffff',
        active: '#1E90FF'
      },
      background: {
        normal: '#1E90FF',
        hover: '#00BFFF',
        active: '#B0E2FF'
      }
    }
  },
  methods: {
    onClick (target) {
      if (this.mode === target) { return }
      this.mode = target
    }
  }
}
</script>

### 高级定制化用法

:::demo
```html
<div class="button-wrap" style="text-align: center;">
  <agile-button content="基本模式" :text="text" :background="background" :active="mode === 'normal'" :user-style="{marginRight: '60px'}" @click.native="onClick('normal')" inline></agile-button>
  <agile-button content="高级模式" :text="text" :background="background" :active="mode === 'advanced'" @click.native="onClick('advanced')" inline></agile-button>
</div>

<agile-sidebar v-if="mode === 'normal'" :setting="navSetting.setting"></agile-sidebar>
<agile-sidebar v-if="mode === 'advanced'" :mode="'advanced'" :setting="navSetting.setting" :body="navSetting.body" :item="navSetting.item"
  :to-top="navSetting.toTop" :close="navSetting.close"></agile-sidebar>

<section v-for="(sec, index) in navSetting.setting" class="nav-section" :id="sec.id" :key="`sec-${index+1}`">
  {{ sec.text }}
</section>

<script>
/* 必须传入的参数 */

const setting = [
  {
    text: '比赛直播',
    id: 'live-section'
  },
  {
    text: '观赛补给箱',
    id: 'lottery-section'
  },
  {
    text: '赛事赛程',
    id: 'plan-section'
  },
  {
    text: '队伍积分',
    id: 'rank-section'
  },
  {
    text: '精彩集锦',
    id: 'video-section'
  },
  {
    text: '关于赛事',
    id: 'info-section'
  }
]

/* 可选：高级模式相关配置（mode为advanced才生效） */

const body = {
  mode: 'image',
  bgColor: '',
  bgSrc: require('../assets/nav-body.png'),
  width: 162,
  height: 412,
  paddingTop: 88
}

const item = {
  font: {
    size: 18,
    normal: '#525252',
    active: '#f89c2d'
  },
  height: 50
}

const toTop = {
  width: 85,
  height: 30,
  content: '',
  pos: {
    bottom: -5
  },
  background: {
    mode: 'image',
    bgSrc: require('../assets/totop.png')
  }
}

const close = {
  width: 22,
  height: 100,
  left: -18,
  background: {
    mode: 'image',
    bgSrc: require('../assets/close-bg.png')
  },
  arrow: {
    width: 12,
    height: 24,
    mode: 'color',
    arColor: '#ffffff'
  }
}

const navSetting = {
  setting,
  body,
  item,
  toTop,
  close
}
</script>
```
:::

### Required Options
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------------- |--------------------------------  |-------- |
| setting | 设置导航内容（必传参数） | Array | — | 空数组 |
| setting内的子元素 | 设置每个锚点对应Dom的id和文案 | { text: String, id: String } | — | — |
| mode | 模式 | String | ”normal“ / ”advanced“ | ”normal“ |



