<template lang="pug">
div#app.m-auto
  page-header(:app-setting="appSetting", :cur-tab="curTab", @togglepath="togglePath")
  router-view(:cur-subtab="curSubtab", :subnav-config="appSetting.navConfig[curTab]", @togglepath="togglePath")
</template>

<style lang="stylus" scoped>
#app
  width 1140px
  padding 60px 100px
</style>

<script>
import PageHeader from './components/page-header/index.vue'
import { appSetting } from './app-setting'

export default {
  name: 'app',
  data () {
    return {
      curTab: -1,
      curSubtab: -1,
      appSetting
    }
  },
  methods: {
    updateCurTab (path) {
      const list = this.appSetting.navConfig
      for (const i in list) {
        if (list.hasOwnProperty(i)) {
          const route = list[i]
          if (route && route.path === path) {
            this.curTab = parseInt(i)
            return
          }
        }
      }
    },
    updateCurSubtab (path) {
      const list = this.appSetting.navConfig[this.curTab].children
      for (const i in list) {
        if (list.hasOwnProperty(i)) {
          const route = list[i]
          if (route && route.path === path) {
            this.curSubtab = parseInt(i)
            return
          }
        }
      }
    },
    togglePath (path) {
      let fullpath = path
      this.curTab = -1
      this.curSubtab = -1
      if (fullpath) {
        const pArray = fullpath.split('/')
        this.updateCurTab(pArray[0])
        if (pArray.length > 1) {
          this.updateCurSubtab(pArray[1])
        } else {
          if (this.appSetting.navConfig[this.curTab].children.length > 0) {
            fullpath += '/' + this.appSetting.navConfig[this.curTab].children[0].path
            this.curSubtab = 0
          }
        }
      }
      this.$router.push('/' + fullpath)
    }
  },
  watch: {
    // 监听路由路径变化
    '$route.path': function (newVal) {
      this.togglePath(newVal.substr(1))
    }
  },
  components: {
    PageHeader
  }
}
</script>
