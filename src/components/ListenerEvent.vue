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
  </div>
</template>
<script>
export default {
  methods: {
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
  }
}
</script>
