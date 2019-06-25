import AgileToast from './components/function-mode/index.js'

export default AgileToast.install = (Vue) => {
  Vue.prototype.$agileToast = AgileToast.creator
}
