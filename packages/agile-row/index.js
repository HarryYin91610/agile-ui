import AgileRow from './components/render'
import './style/index.styl'

export default AgileRow.install = function(Vue) {
  Vue.component(AgileRow.name, AgileRow)
}

