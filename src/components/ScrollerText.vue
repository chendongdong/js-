<template>
  <div>
    <div class="scroller-container">
      <img src="../assets/ic_remind_red.png" class="scroller-icon">
      <p id="scroller-text" class="scroller-text">开始，左右左，左右左，右左右，左右左，右左右,666666，左右左，右左右，左右左，右左右，结束</p>
    </div>
    <div style="margin-top: 20px">
      <input type="radio" name="type" value="left" v-model="direction"/>向左滚动
      <input type="radio" name="type" value="right" v-model="direction" style="margin-left: 15px"/>向右滚动
      <input type="radio" name="type" value="left-right" v-model="direction" style="margin-left: 15px"/>左右循环
    </div>
  </div>
</template>
<script>
import ScrollerText from '../utils/ScrollerText'
export default {
  data () {
    return {
      direction: 'left'
    }
  },
  watch: {
    direction () {
      this.switchDirection()
    }
  },
  methods: {
    switchDirection () {
      ScrollerText.stopTimer()
      let rightEle = document.getElementById('scroller-text')
      ScrollerText.moveText({marginLeft: 40, time: 20, scrollEle: rightEle, direction: this.direction})
    }
  },
  mounted () {
    this.switchDirection()
  },
  beforeDestroy () {
    // 停止定时器
    ScrollerText.stopTimer()
  }
}
</script>
<style>
  .scroller-container{
    margin-top: 20px;
    position: relative;
    height: 30px;
    background: #f7f7f7;
    overflow: hidden;
  }
  .scroller-icon{
    width: 18px;
    position: absolute;
    top: 50%;
    left: 0px;
    background: red;
    padding: 0 10px;
    background: #f7f7f7;
    transform: translateY(-50%);
  }
  .scroller-text{
    display: inline-block;
    font-size: 13px;
    line-height: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: clip;
    color: #777;
    margin: 0 0 0 40px;
  }
</style>
