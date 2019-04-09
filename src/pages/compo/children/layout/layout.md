## Layout 布局

通过 agile-row、agile-col 组合使用可以迅速完成布局。

<script>
export default {}
</script>

### 基础用法

:::demo 通过配置`agile-row`的属性`gap`来设置每一列之间的间距；通过配置`agile-row`或`agile-col`的属性`tag`来设置组件所渲染的元素。
```html
<agile-row :gap="5" tag="section">
  <agile-col :span="24" tag="span"><div class="col-content bg-blue"></div></agile-col>
</agile-row>

<agile-row :gap="5">
  <agile-col :span="12"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="12"><div class="col-content bg-blue"></div></agile-col>
</agile-row>

<agile-row :gap="5">
  <agile-col :span="8"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="8"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="8"><div class="col-content bg-blue"></div></agile-col>
</agile-row>

<agile-row :gap="5">
  <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
</agile-row>

<agile-row :gap="5">
  <agile-col :span="4"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="4"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="4"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="4"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="4"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="4"><div class="col-content bg-blue"></div></agile-col>
</agile-row>

<agile-row :gap="5">
  <agile-col :span="3"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="3"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="3"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="3"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="3"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="3"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="3"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="3"><div class="col-content bg-blue"></div></agile-col>
</agile-row>
```
:::

### 列偏移

:::demo 通过配置`agile-col`组件的属性`offset`来设置列的左偏移格数
```html
<agile-row :gap="5">
  <agile-col :span="24"><div class="col-content bg-blue"></div></agile-col>
</agile-row>

<agile-row :gap="5">
  <agile-col :span="12"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :offset="6" :span="6"><div class="col-content bg-blue"></div></agile-col>
</agile-row>

<agile-row :gap="5">
  <agile-col :span="8"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :offset="8" :span="8"><div class="col-content bg-blue"></div></agile-col>
</agile-row>

<agile-row :gap="5">
  <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :offset="6" :span="6"><div class="col-content bg-blue"></div></agile-col>
</agile-row>
```
:::

### 水平对齐方式

:::demo 通过配置`agile-row`组件的属性`justify`来设置水平对齐方式（布局方式同flex）
```html
<agile-row :gap="5">
  <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
</agile-row>

<agile-row :gap="5" justify="end">
  <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
</agile-row>

<agile-row :gap="5" justify="center">
  <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
</agile-row>

<agile-row :gap="5" justify="space-between">
  <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
</agile-row>

<agile-row :gap="5" justify="space-around">
  <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
</agile-row>
```
:::

### 垂直对齐方式

:::demo 通过配置`agile-row`组件的属性`align`来设置垂直对齐方式（布局方式同flex）
```html
<div class="outline">
  <agile-row :height="50" :gap="5">
    <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
    <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
    <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
  </agile-row>
</div>

<div class="outline">
  <agile-row :height="50" :gap="5" align="end">
    <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
    <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
    <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
  </agile-row>
</div>

<div class="outline">
  <agile-row :height="50" :gap="5" align="center">
    <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
    <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
    <agile-col :span="6"><div class="col-content bg-blue"></div></agile-col>
  </agile-row>
</div>
```
:::

### 响应式布局

:::demo 通过配置`agile-col`的属性`xs` `sm` `md` `lg` `xl`来设置每列响应式宽度
```html
<agile-row :gap="5">
  <agile-col :xs="4" :sm="4" :md="6" :lg="8" :xl="12"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :xs="4" :sm="6" :md="8" :lg="8" :xl="6"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :xs="4" :sm="6" :md="5" :lg="4" :xl="3"><div class="col-content bg-blue"></div></agile-col>
  <agile-col :xs="4" :sm="{span: 4, offset: 4}" :md="5" :lg="4" :xl="3"><div class="col-content bg-blue"></div></agile-col>
</agile-row>
```
:::

### agileRow Options
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------------- |--------------------------------  |-------- |
| tag | 自定义元素标签 | String | html标签 | div |
| height | 自定义固定行高 | Number | — | — |
| gap | 定义每列之间的间距格数 | Number | — | — |
| justify | 定义内容水平对齐方式（flex原理实现） | String | start / end / center / space-around / space-between | start |
| align | 定义内容垂直对齐方式（flex原理实现） | String | start / end / center | start |

### agileCol Options
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------------- |--------------------------------  |-------- |
| tag | 自定义元素标签 | String | html标签 | div |
| span | 自定义列宽格数 | Number | — | 24 |
| offset | 定义列左侧偏移格数 | Number | — | — |
| xs | <768px 响应式栅格数或者栅格属性对象 | Number / Object |  例：{span: 4, offset: 4} | — |
| sm | ≥768px 响应式栅格数或者栅格属性对象 | Number / Object | 例：{span: 4, offset: 4} | — |
| md | ≥992px 响应式栅格数或者栅格属性对象 | Number / Object | 例：{span: 4, offset: 4} | — |
| lg | ≥1200px 响应式栅格数或者栅格属性对象 | Number / Object | 例：{span: 4, offset: 4} | — |
| xl | ≥1920px 响应式栅格数或者栅格属性对象 | Number / Object | 例：{span: 4, offset: 4} | — |
