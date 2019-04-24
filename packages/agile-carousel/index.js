import AgileCarousel from './components/main.vue'
import AgileCarouselItem from './components/item.vue'

AgileCarousel.install = (Vue) => {
  Vue.component(AgileCarousel.name, AgileCarousel)
  Vue.component(AgileCarouselItem.name, AgileCarouselItem)
}

export default AgileCarousel
