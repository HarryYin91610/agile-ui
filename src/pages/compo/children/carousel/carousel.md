## Carousel 轮播

类似走马灯的方式循环播放卡片。

<script>
export default {}
</script>

### 基础用法

:::demo 通过`agile-carousel`的属性`width`来设置轮播组件的宽度
```html
<agile-carousel :width="400">
  <agile-carousel-item v-for="item in [1, 2, 3, 4]" :key="item">
    <div class="custom-inner" :class="[`color-${item}`]">demo-{{item}}</div>
  </agile-carousel-item>
</agile-carousel>
```
:::

### 设置初始卡片

:::demo 通过`agile-carousel`的属性`init-index`来设置初始显示的卡片索引
```html
<agile-carousel :width="400" :init-index="1">
  <agile-carousel-item v-for="item in [1, 2, 3, 4]" :key="item">
    <div class="custom-inner" :class="[`color-${item}`]">demo-{{item}}</div>
  </agile-carousel-item>
</agile-carousel>
```
:::

### 隐藏锚点

:::demo 
```html
<agile-carousel :indicator="{show: false}" :width="400">
  <agile-carousel-item v-for="item in [1, 2, 3, 4]" :key="item">
    <div class="custom-inner" :class="[`color-${item}`]">demo-{{item}}</div>
  </agile-carousel-item>
</agile-carousel>
```
:::

### 禁用循环切换

:::demo 通过`agile-carousel`的属性`loop`来设置是否可循环
```html
<agile-carousel :loop="false" :width="400">
  <agile-carousel-item v-for="item in [1, 2, 3, 4]" :key="item">
    <div class="custom-inner" :class="[`color-${item}`]">demo-{{item}}</div>
  </agile-carousel-item>
</agile-carousel>
```
:::

### 自定义样式

:::demo 通过`agile-carousel`的属性`indicator`和`arrow`来自定义样式
```html
<agile-carousel 
  :indicator="{size: 20, height: 4, bottom: -20, normalColor: '#EE82EE', activeColor: '#00CDCD', isRound: false}" 
  :arrow="{size: 40, color: '#1E90FF', background: {show: false}}"
  :width="500">
  <agile-carousel-item v-for="item in [1, 2, 3, 4]" :key="item"> 
    <div class="custom-inner" :class="[`color-${item}`]">demo-{{item}}</div>
  </agile-carousel-item>
</agile-carousel>
```
:::

### agileCarousel Options
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------------- |--------------------------------  |-------- |
| width | 设置轮播宽度 | Number | — | 350 |
| loop | 设置是否可循环 | Boolean | — | true |
| autoplay | 设置是否自动切换 | Boolean | — | true |
| interval | 设置自动切换的时间间隔（ms） | Number | — | 5000 |
| initIndex | 设置初始显示的卡片索引 | Number | — | 0 |
| arrow | 设置轮播的左右箭头 | { size: Number, color: String, background: Object } | — | { size: 30, color: ”#ffffff“ } |
| arrow.background | 设置箭头背景 | { color: String, show: Boolean } | — | { color: ”#99a9bf“, show: true } |
| indicator | 设置轮播的锚点 | { show: Boolean, bottom: Number, size: Number, height: Number, isRound: Boolean, normalColor: String, activeColor: String } | — | { show: true, bottom: 10, size: 10, height: 0, isRound: true, normalColor: ”#C1CDCD“, activeColor: ”#1E90FF“ }|