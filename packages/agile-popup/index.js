import AgilePopupFunc from './components/function-mode/index.js'

export default {
  install (Vue, options) {
    Vue.component(AgilePopupFunc.name, AgilePopupFunc)
    Vue.prototype.$agilePopup = AgilePopupFunc.creator
  }
}
