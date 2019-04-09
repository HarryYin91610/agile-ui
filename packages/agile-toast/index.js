import AgileToast from './components/function-mode/index'

export default AgileToast.install = (Vue) => {
  Vue.prototype.$agileToast = AgileToast.creator
}
