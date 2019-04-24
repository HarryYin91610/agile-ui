/**
  created by HarryYin on 2019-02-26
*/
export function initRequestAnimationFrame () {
  // 初始化兼容不同浏览器
  var lastTime = 0
  var vendors = ['webkit', 'moz']
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
                                  window[vendors[x] + 'CancelRequestAnimationFrame']
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime()
      var timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
      var id = window.setTimeout(() => {
        callback()
      }, timeToCall)
      lastTime = currTime + timeToCall
      return id
    }
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      window.clearTimeout(id)
    }
  }
}

// 检测元素是否在浏览器可视区域
export function isVisible (el) {
  if (!el) { return }
  const rect = el.getBoundingClientRect()
  return rect.bottom >= 0 && rect.top <= document.documentElement.clientHeight
}
