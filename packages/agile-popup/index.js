import AgilePopup from './components/main/index.js'

export default AgilePopup.install = (Vue) => {
  Vue.prototype.$agilePopup = AgilePopup.creator
}
