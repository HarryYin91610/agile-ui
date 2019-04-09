export default {
  name: 'agile-row',

  props: {
    tag: {
      type: String,
      default: 'div'
    },
    height: Number,
    gap: Number,
    justify: {
      type: String,
      default: 'start' // 'end' or 'center' or 'space-between' or 'space-around'
    },
    align: {
      type: String,
      default: 'start' // 'end' or 'center' or 'baseline' or 'stretch'
    }
  },

  render(h) {
    const style = {}
    
    if (this.height) {
      style.height = this.height + 'px'
    }

    return h(this.tag, {
      class: [
        'agile-row',
        this.justify !== 'start' ? `is-justify-${this.justify}` : '',
        this.align !== 'start' ? `is-align-${this.align}` : ''
      ],
      style
    }, this.$slots.default)
  }
};
