import Vue from 'vue'
import router from './router'

import App from './app.vue'
import demoBlock from '@/components/demo-block/index.vue'
import AgileButton from '../packages/agile-button'
import AgileToast from '../packages/agile-toast'
import AgileInfoIcon from '../packages/agile-info-icon'

// Styles
import './style/index.styl'
import 'highlight.js/styles/github.css' // 样式文件

// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false

Vue.component('demo-block', demoBlock)
Vue.use(AgileButton)
Vue.use(AgileToast)
Vue.use(AgileInfoIcon)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
