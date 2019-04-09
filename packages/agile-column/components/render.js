export default {
  name: 'agile-col',

  props: {
    span: {
      type: Number,
      default: 24
    },
    tag: {
      type: String,
      default: 'div'
    },
    offset: Number,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },

  computed: {
    gap () {
      let parent = this.$parent
      while (parent && parent.$options.name !== 'agile-row') {
        parent = parent.$parent
      }
      return parent ? parent.gap : 0
    }
  },
  render (h) {
    let classList = []
    let style = {}
    const cusList = ['span', 'offset']
    const sizeList = ['xs', 'sm', 'md', 'lg', 'xl']

    if (this.gap) {
      style.paddingLeft = this.gap / 2 + 'px'
      style.paddingRight = style.paddingLeft
    }

    cusList.forEach(prop => {
      if (this[prop] || this[prop] === 0) {
        classList.push(
          prop !== 'span'
            ? `agile-col-${prop}-${this[prop]}`
            : `agile-col-${this[prop]}`
        )
      }
    })

    sizeList.forEach(size => {
      if (typeof this[size] === 'number') {
        classList.push(`agile-col-${size}-${this[size]}`)
      } else if (typeof this[size] === 'object') {
        let props = this[size]
        Object.keys(props).forEach(prop => {
          classList.push(
            prop !== 'span'
              ? `agile-col-${size}-${prop}-${props[prop]}`
              : `agile-col-${size}-${props[prop]}`
          )
        })
      }
    })

    return h(this.tag, {
      class: ['agile-col', ...classList],
      style
    }, this.$slots.default)
  }
}
