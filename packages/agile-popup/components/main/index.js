import Vue from 'vue'
import AgilePopupWrap from './agile-popup-wrap.vue'

AgilePopupWrap.creator = function (popSetting, parentNode = null) {
  const AgilePopup = Vue.extend(AgilePopupWrap)
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

export default AgilePopupWrap
