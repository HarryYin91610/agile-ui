import Vue, {VNode} from 'vue'
import { PluginObject } from 'vue/types/plugin'
import { IToastSetting } from './components/function-mode/typings'

// 在 Vue 组件实例上扩展.
declare module 'vue/types/vue' {
  interface Vue {
    /**
     * toast
     */
    $agileToast (data: IToastSetting):VNode
  }
}

export default function install<T> (): PluginObject<T>