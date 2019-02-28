<template lang="pug">
div.guide-page-wrap.f-clear.p-relative
  sidebar(title="开发指南", :nav-list="subnavConfig.children", :cur-subtab="curSubtab", @togglesubtab="toggleSubtab")
  div.main-content.f-left
    router-view
</template>

<style lang="stylus" scoped> 
.guide-page-wrap
  .main-content 
    width 906px
       
</style>

<script>
import Sidebar from '@/components/sidebar/index.vue'

export default {
  name: 'guide-page',
  props: ['curSubtab', 'subnavConfig'],
  methods: {
    toggleSubtab (path) {
      const fullpath = `guide/${path}`
      this.$emit('togglepath', fullpath)
    }
  },
  components: {
    Sidebar
  }
}
</script>
