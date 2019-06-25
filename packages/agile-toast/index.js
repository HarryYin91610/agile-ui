import AgileToast from './components/main/index.js'

export default AgileToast.install = (Vue) => {
  Vue.prototype.$agileToast = AgileToast.creator
}
