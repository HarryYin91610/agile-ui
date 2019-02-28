<template lang="pug">
div.compo-page-wrap.f-clear.p-relative
  sidebar(title="组件", :nav-list="subnavConfig.children", :cur-subtab="curSubtab", @togglesubtab="toggleSubtab")
  div.main-content.f-left.border-box
    router-view
</template>

<style lang="stylus" scoped> 
.compo-page-wrap
  .main-content 
    width 906px
    padding 10px 0 0 20px
       
</style>

<script>
import Sidebar from '@/components/sidebar/index.vue'

export default {
  name: 'compo-page',
  props: ['curSubtab', 'subnavConfig'],
  methods: {
    toggleSubtab (path) {
      const fullpath = `compo/${path}`
      this.$emit('togglepath', fullpath)
    }
  },
  components: {
    Sidebar
  }
}
</script>
