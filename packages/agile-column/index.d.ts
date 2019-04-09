import Vue, {VNode} from 'vue'
import { PluginObject } from 'vue/types/plugin'

// 在 Vue 组件实例上扩展.
declare module 'vue/types/vue' {}

export default function install<T> (): PluginObject<T>