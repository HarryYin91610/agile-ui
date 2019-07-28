/* eslint-disable */
import Vue, {VNode} from 'vue'
import { PluginObject, PluginFunction } from 'vue/types/plugin'

// 在 Vue 组件实例上扩展.
declare module 'vue/types/vue' {}

interface IPluginObject<T> extends Vue {
  install: PluginFunction<T>
}

export default IPluginObject