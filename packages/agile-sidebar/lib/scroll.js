/**
  created by HarryYin on 2019-02-26
*/
// 优化版动画：滚动至指定位置
import { initRequestAnimationFrame } from './util'

initRequestAnimationFrame()

export function moveScreenTo (start, end, step = 40) {
  return new Promise((resolve, reject) => {
    let curPos = start

    const run = () => {
      if ((step > 0 && curPos >= end) || (step < 0 && curPos <= end)) {
        resolve()
      } else {
        curPos = curPos + step
        window.scrollTo(0, curPos)
        window.requestAnimationFrame(run)
      }
    }

    if (start !== end) {
      const direc = start < end ? 1 : -1 // 1--> 向下, -1-->向上
      step *= direc
      run()
    } else {
      resolve()
    }
  })
}
