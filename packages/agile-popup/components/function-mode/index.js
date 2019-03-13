import Vue from 'vue'
import AgilePopupFunc from './popup-function.vue'

AgilePopupFunc.creator = function (popSetting, parentNode = null) {
  const AgilePopup = Vue.extend(AgilePopupFunc)
  const component = new AgilePopup({
    data: popSetting
  }).$mount()
  if (parentNode) {
    parentNode.appendChild(component.$el)
  } else {
    document.body.appendChild(component.$el)
  }
  return component
}

export default AgilePopupFunc
