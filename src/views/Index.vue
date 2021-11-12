<template lang="pug">
  .index.content
    h2.animate__animated.animate__shakeX
      | The F2E | Eudora
    ul
      li(v-for="page in pages" :key="page.path")
        input(type="checkbox" v-model="page.checked")
        router-link(:to="'/'+page.path")
          | {{page.path}}：{{page.subject}}
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      pages: [
        {path: 'th1-01', checked: true, subject: 'ToDoList'},
        {path: 'th1-02', checked: true, subject: 'Filter'},
        {path: 'th1-03', checked: false, subject: 'Admin order'},
        {path: 'th1-04', checked: false, subject: 'Product Gallery'},
        {path: 'th1-05', checked: false, subject: 'Comic Viewer'},
        {path: 'th1-06', checked: false, subject: 'Validation'},
        {path: 'th1-07', checked: false, subject: 'Canvas Game'},
        {path: 'th1-08', checked: false, subject: 'Parallax scrolling'},
        {path: 'th1-09', checked: false, subject: 'Skill Tree'},
        {path: 'th2-01', checked: false, subject: '番茄鐘'},
        {path: 'th2-02', checked: false, subject: '新接龍'},
        {path: 'th2-03', checked: false, subject: 'MP3 Player'},
        {path: 'th2-04', checked: false, subject: '線上支付'},
        {path: 'th2-05', checked: false, subject: '90 秒挑戰遊戲'},
        {path: 'th2-06', checked: false, subject: '旅館預約服務'},
        {path: 'th2-07', checked: false, subject: '匿名聊天室'},
        {path: 'th2-08', checked: false, subject: '雲端硬碟'},
        {path: 'th2-09', checked: false, subject: '筆記軟體'},
        {path: 'th2-10', checked: false, subject: '口罩地圖'},
        {path: 'th3-01', checked: false, subject: '台灣旅遊景點導覽'},
        {path: 'th3-02', checked: false, subject: '自行車道地圖資訊整合網'},
        {path: 'th3-03', checked: false, subject: '全台公車動態時刻查詢應用服務'}
      ]
    }
  }
}
</script>

<style lang="scss">
.index {
  font-size: 1.2rem;
  margin: auto;
  padding: 2rem;
  text-align: center;
  ul {
    margin: 1rem auto;
    display: inline-block;
  }
  li {
    width: 100%;
    text-align: left;
  }
  a {
    line-height: 2rem;
    color: #42b983;
    &:hover {
      filter: brightness(1.2);
    }
  }
}
</style>
