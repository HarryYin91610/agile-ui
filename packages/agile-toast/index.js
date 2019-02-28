import ToastFunc from './components/function-mode/index'

export default {
  install (Vue, options) {
    Vue.prototype.$agileToast = ToastFunc.creator
  }
}
