## Sidebar 侧边栏

用于页面滚动导航。

<script>
import navSetting from './const/navbar-setting'

export default {
  data () {
    return {
      navSetting
    }
  }
}
</script>

### 基础用法

:::demo
```html
<agile-sidebar :setting="navSetting.setting" :body="navSetting.body" :item="navSetting.item"
  :to-top="navSetting.toTop" :close="navSetting.close"></agile-sidebar>

<section v-for="(sec, index) in navSetting.setting" class="nav-section" :id="sec.id" :key="`sec-${index+1}`">{{ sec.text }}</section>

<script>
// navbar-setting.js内容如下

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

export default {
  setting,
  body,
  item,
  toTop,
  close
}
</script>
```
:::

