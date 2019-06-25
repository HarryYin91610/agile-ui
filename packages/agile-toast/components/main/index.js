import Vue from 'vue'
import AgileToastTemplate from './index.vue'

AgileToastTemplate.creator = function (toastSetting) {
  const AgileToast = Vue.extend(AgileToastTemplate)

  const component = new AgileToast({
    data: toastSetting
  }).$mount()

  document.body.appendChild(component.$el)

  return component
}

export default AgileToastTemplate
