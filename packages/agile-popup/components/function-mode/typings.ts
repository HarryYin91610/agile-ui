/**
 * popup
 *
 * @interface
 * @readonly
 */
interface IPopupSetting {
  show?: boolean

  width?: number

  mask?: object

  background?: object

  bgTop?: object

  bgMid?: object

  bgBottom?: object

  close?: object

  innerData?: object

  component?: object

  componentName?: string
}

export {
  IPopupSetting
}
