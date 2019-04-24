export const throttle = (ts, callback) => {
  let timer = null
  return function (args) {
    let obj = this
    if (timer) {
      window.clearTimeout(timer)
    }
    timer = setTimeout(() => {
      callback.call(obj, args)
    }, ts)
  }
}