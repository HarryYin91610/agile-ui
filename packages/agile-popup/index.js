import AgilePopup from './components/function-mode/index.js'

export default AgilePopup.install = (Vue) => {
  Vue.prototype.$agilePopup = AgilePopup.creator
}
