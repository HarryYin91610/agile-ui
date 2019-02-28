
interface INavBaseInfo {
  chn: string,
  en: string,
  path: string
}

interface INavInfo extends INavBaseInfo {
  children: INavBaseInfo[]
}

interface IRouteSetting {
  path: string,
  name?: string,
  component: any,
  children: any[]
}