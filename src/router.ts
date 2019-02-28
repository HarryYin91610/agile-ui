/**
 * Created by HarryYin on 2019/01/28.
 */
/// <reference path="./typings/route.d.ts" />

import Vue from 'vue'
import VueRouter from 'vue-router'
import { appSetting } from './app-setting'

Vue.use(VueRouter)

let routes: IRouteSetting[] = [
  {
    path: '/',
    name: 'home',
    component: () => import(`./pages/home/index.vue`),
    children: []
  }
]

const registerRoute = ( navConfig: INavInfo[] ): IRouteSetting[] => {
  const route: IRouteSetting[] = []
  navConfig.forEach((nav: INavInfo) => {
    const name = nav.path ? nav.path : 'home'
    const setting: IRouteSetting = {
      path: `/${nav.path}`,
      name,
      component: () => import(`./pages/${name}/index.vue`),
      children: []
    }
    if (nav.hasOwnProperty('children')) {
      nav.children.forEach((subnav: INavBaseInfo) => {
        setting.children.push({
          path: subnav.path,
          component: () => import(`./pages/${name}/children/${subnav.path}/index.vue`)
        })
      })
    }
    route.push(setting)
  })
  return route
}

routes = routes.concat(registerRoute(appSetting.navConfig))

export default new VueRouter({
  routes
})
