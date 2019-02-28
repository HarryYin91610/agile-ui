import Vue from 'vue'
import AgileToastTem from './index.vue'

AgileToastTem.creator = function (toastSetting) {
  const AgileToast = Vue.extend(AgileToastTem)

  const component = new AgileToast({
    data: toastSetting
  }).$mount()

  document.body.appendChild(component.$el)

  return component
}

export default AgileToastTem
