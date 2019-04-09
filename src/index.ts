import Vue from 'vue'
import router from './router'

import App from './app.vue'
import demoBlock from '@/components/demo-block/index.vue'
import AgileButton from '../packages/agile-button'
import AgileToast from '../packages/agile-toast'
import AgilePopup from '../packages/agile-popup'
import AgileRow from '../packages/agile-row'
import AgileColumn from '../packages/agile-column'

// Styles
import './style/index.styl'
import 'highlight.js/styles/github.css' // 样式文件

// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false

Vue.component('demo-block', demoBlock)
Vue.use(AgileButton)
Vue.use(AgileToast)
Vue.use(AgilePopup)
Vue.use(AgileRow)
Vue.use(AgileColumn)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
