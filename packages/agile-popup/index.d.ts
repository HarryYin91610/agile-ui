import Vue, {VNode} from 'vue'
import { PluginObject } from 'vue/types/plugin'
import { IPopupSetting } from './components/main/typings'

// 在 Vue 组件实例上扩展.
declare module 'vue/types/vue' {
  interface Vue {
    /**
     * toast
     */
    $agilePopup (data: IPopupSetting):VNode
  }
}

export default function install<T> (): PluginObject<T>