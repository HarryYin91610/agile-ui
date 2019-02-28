/**
 * toast
 *
 * @interface
 * @readonly
 */
interface IToastSetting {
  show?: boolean

  timeout?: number

  parentNode?: HTMLElement

  userStyle?: object

  content?: string
}

export {
  IToastSetting
}
