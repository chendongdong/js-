<template>
  <div>
    <h1>我是监听事件</h1>
    <input placeholder="请输入" id="input"/>
    <div style="margin: 20px 0;">
      我是监听的内容：
      <span id="copy"></span>
    </div>
    <button @click="clickAdd">添加监听</button>
    <button @click="clickDel">移除监听</button>
    <div style="margin-top: 20px">
      <textarea class="input-text" id="textarea" placeholder="输入内容"/>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    autoTextarea (elem, extra, maxHeight) {
      // 判断elem是否为数组
      if (elem.length > 0) {
        for (var i = 0; i < elem.length; i++) {
          e(elem[i])
        }
      } else {
        e(elem)
      }
      function e (elem) {
        extra = extra || 0
        var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window
        var isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera')
        var addEvent = function (type, callback) {
          elem.addEventListener ? elem.addEventListener(type, callback, false) : elem.attachEvent('on' + type, callback)
        }
        var getStyle = elem.currentStyle ? function (name) {
          var val = elem.currentStyle[name]

          if (name === 'height' && val.search(/px/i) !== 1) {
            var rect = elem.getBoundingClientRect()
            return rect.bottom - rect.top - parseFloat(getStyle('paddingTop')) - parseFloat(getStyle('paddingBottom')) + 'px'
          }

          return val
        } : function (name) {
          return getComputedStyle(elem, null)[name]
        }
        var minHeight = parseFloat(getStyle('height'))

        elem.style.resize = 'none'

        var change = function () {
          var scrollTop
          var height
          var padding = 0
          var style = elem.style

          if (elem._length === elem.value.length) return
          elem._length = elem.value.length

          if (!isFirefox && !isOpera) {
            padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'))
          }
          scrollTop = document.body.scrollTop || document.documentElement.scrollTop

          elem.style.height = minHeight + 'px'
          // 如果输入内容的高度大于当前高度, 调整高度
          if (elem.scrollHeight > minHeight) {
            // 如果输入内容的高度大于设置的最大高度，则按最大高度显示，并显示滚动条
            if (maxHeight && elem.scrollHeight > maxHeight) {
              height = maxHeight - padding
              style.overflowY = 'auto'
            } else {
              height = elem.scrollHeight - padding
              style.overflowY = 'hidden'
            }
            style.height = height + extra + 'px' // 控制高度变化的关键
            scrollTop += parseInt(style.height) - elem.currHeight
            document.body.scrollTop = scrollTop
            document.documentElement.scrollTop = scrollTop
            elem.currHeight = parseInt(style.height) // 这行代码没什么作用
          }
        }

        addEvent('propertychange', change)
        addEvent('input', change)
        addEvent('focus', change)
        change()
      }
    },
    clickAdd () {
      console.log('添加监听了')
      let inputEle = document.getElementById('input')
      this.addListener(inputEle, 'keyup', this.handlerClick)
    },
    addListener (ele, type, hander) {
      if (ele.addEventListener) {
        ele.addEventListener(type, hander, false)
      } else if (ele.attachEvent) {
        ele.attachEvent('on' + type, hander)
      } else {
        ele['on' + type] = hander
      }
    },
    handlerClick (event) {
      let e = event || window.event
      let target = e.target || e.srcElement
      console.log('target=', target)
      let inputVal = target.value
      let copyEle = document.getElementById('copy')
      copyEle.innerText = inputVal
    },
    clickDel () {
      console.log('移除监听了')
      let inputEle = document.getElementById('input')
      this.delListener(inputEle, 'keyup', this.handlerClick)
      let copyEle = document.getElementById('copy')
      copyEle.innerText = ''
    },
    delListener (ele, type, hander) {
      if (ele.removeEventListener) {
        ele.removeEventListener(type, hander, false)
      } else if (ele.attachEvent) {
        ele.attachEvent('on' + type, hander)
      } else {
        ele.onclick = null
      }
    }
  },
  mounted () {
    this.autoTextarea(document.getElementById('textarea'), 0, 100)
  }
}
</script>
<style>
  .input-text{
    width: 100%;
    /*自动换行*/
    /*word-wrap: break-word;*/
    /*word-break: normal;*/
    min-height: 26px;
    height: 26px;
    padding: 0px;
  }
</style>
