// 定时器
let marqueeTimer = null
let currentState = null
let leftWid = null
let isFirst = true
export default {
  /**
   * 向左滚动文字，消失后从右边开始循环滚动
   * @param leftWid：距离屏幕左边的距离
   * @param time：每次移动的时间，单位：毫秒
   * @param scrollEle：要滚动的元素
   */
  moveText ({marginLeft = 0, time = 50, scrollEle, direction}) {
    console.log('moveText----direction=', direction)
    if (!scrollEle) return
    // 获取内容的宽度
    let textWidth = scrollEle.clientWidth
    // 开始循环滚动的距离，即最后一个文字与第一个文字的距离
    let rx = 0
    if (direction === 'left') {
      rx = marginLeft - textWidth
    } else if (direction === 'right') {
      rx = window.screen.width - marginLeft
    } else if (direction === 'left-right') {
      currentState = 'left'
      rx = window.screen.width - textWidth - marginLeft
    }
    // 如果内容的宽度大于屏幕的宽度就滚动，否则不滚动
    if (textWidth + marginLeft > window.screen.width) {
      if (direction === 'right') {
        leftWid = window.screen.width - textWidth - marginLeft
      } else {
        leftWid = marginLeft
      }
      startScroll()
      runTimer()
      // removeEvent()
      if (isFirst) {
        isFirst = false
        addEvent()
      }
    }

    function addEvent () {
      if (document.addEventListener) {
        // 电脑，鼠标进入
        scrollEle.addEventListener('mouseover', () => this.stopTimer(), false)
        // 鼠标移除
        scrollEle.addEventListener('mouseout', runTimer, false)
        // 移动端，手指触摸屏幕
        scrollEle.addEventListener('touchstart', touch, false)
        // 手指离开屏幕
        scrollEle.addEventListener('touchend', touch, false)
      } else if (document.attachEvent) {
        scrollEle.attachEvent('onmouseover', () => this.stopTimer())
        scrollEle.attachEvent('onmouseout', runTimer())
      } else {
        scrollEle.onmouseover = this.stopTimer()
        scrollEle.onmouseout = runTimer
      }
    }

    // function removeEvent () {
    //   if (scrollEle.removeEventListener) {
    //     // 电脑，鼠标进入
    //     scrollEle.removeEventListener('mouseover', this.stopTimer(), false)
    //     // 鼠标移除
    //     scrollEle.removeEventListener('mouseout', runTimer(), false)
    //     // 移动端，手指触摸屏幕
    //     scrollEle.removeEventListener('touchstart', touch, false)
    //     // 手指离开屏幕
    //     scrollEle.removeEventListener('touchend', touch, false)
    //   } else if (scrollEle.detachEvent) {
    //     scrollEle.detachEvent('onmouseover', this.stopTimer)
    //     scrollEle.detachEvent('onmouseout', runTimer)
    //   } else {
    //     scrollEle.onmouseover = null
    //     scrollEle.onmouseout = null
    //   }
    // }

    function startScroll () {
      if (direction === 'left') {
        // 向左滚动，文字全部从左边消失，再从右边开始向左滚动
        if (leftWid > rx) {
          leftWid--
          // 接触到左边极限，循环
          if (leftWid === rx) {
            leftWid = window.screen.width
          }
        }
      } else if (direction === 'right') {
        // 向右滚动，文字全部从右边消失，再从左边开始向右滚动
        if (leftWid < rx) {
          leftWid++
          // 接触到右边极限，循环
          if (leftWid === rx) {
            leftWid = -textWidth - window.screen.width + marginLeft
          }
        }
      } else if (direction === 'left-right') {
        // 左右循环滚动
        if (currentState === 'left') {
          // 向左滚动
          if (leftWid >= rx) {
            leftWid--
            // 接触到左边极限，向右
            if (leftWid === rx) {
              currentState = 'right'
            }
          }
        } else {
          // 向右滚动
          if (leftWid <= marginLeft) {
            leftWid++
            // 接触到右边极限，向左
            if (leftWid === marginLeft) {
              currentState = 'left'
            }
          }
        }
      }
      // 设置对象的x轴位置，滚动的关键
      scrollEle.style.marginLeft = leftWid + 'px'
    }
    // 处理触摸事件，手指按住滚动文字时，停止滚动，松开时继续滚动
    function touch (e) {
      let event = e || window.event
      switch (event.type) {
        case 'touchstart':
          if (marqueeTimer) {
            clearInterval(marqueeTimer)
            marqueeTimer = null
          }
          break
        case 'touchend':
          runTimer()
          break
      }
    }

    function runTimer () {
      marqueeTimer = setInterval(startScroll, time)
    }
  },
  stopTimer () {
    if (marqueeTimer) {
      clearInterval(marqueeTimer)
      marqueeTimer = null
      currentState = null
      leftWid = null
    }
  }
}
