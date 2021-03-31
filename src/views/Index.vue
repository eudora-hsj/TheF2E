<template>
  <div class="index">
    <h2 class="animate__animated animate__shakeX">The F2E | Eudora</h2>
    <ul>
      <li v-for="page in pages" :key="page.path">
        <router-link :to="'/'+page.path">
          {{page.path}}：{{page.subject}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      pages: [
        {path: 'th1-01', subject: 'ToDoList'},
        {path: 'th1-02', subject: 'Filter'},
        {path: 'th1-03', subject: 'Admin order'},
        {path: 'th1-04', subject: 'Product Gallery'},
        {path: 'th1-05', subject: 'Comic Viewer'},
        {path: 'th1-06', subject: 'Validation'},
        {path: 'th1-07', subject: 'Canvas Game'},
        {path: 'th1-08', subject: 'Parallax scrolling'},
        {path: 'th1-09', subject: 'Skill Tree'},
        {path: 'th2-01', subject: '番茄鐘'},
        {path: 'th2-02', subject: '新接龍'},
        {path: 'th2-03', subject: 'MP3 Player'},
        {path: 'th2-04', subject: '線上支付'},
        {path: 'th2-05', subject: '90 秒挑戰遊戲'},
        {path: 'th2-06', subject: '旅館預約服務'},
        {path: 'th2-07', subject: '匿名聊天室'},
        {path: 'th2-08', subject: '雲端硬碟'},
        {path: 'th2-09', subject: '筆記軟體'},
        {path: 'th2-10', subject: '口罩地圖'}
      ]
    }
  }
}
</script>

<style lang="scss">
.index {
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
