import AgileColumn from './components/render'
import './style/index.styl'

export default AgileColumn.install = function(Vue) {
  Vue.component(AgileColumn.name, AgileColumn)
}
