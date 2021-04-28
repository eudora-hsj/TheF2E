<template lang="pug">
  .f2e1-01.content
    .banner
      ul {{test}}
        li(v-for="listPage in listPages" :key="listPage.value"
            :class="{'active': currentListPage === listPage.value}"
            @click="currentListPage=listPage.value")
          | {{listPage.name}}
    .content
      .panel-add
        el-input.add-task(v-if="editStatus === 'edit'" placeholder="＋Add Task" :class="{'warn': isWarn}"
                          @focus="defaultCacheTask(); editStatus = 'add';" @keyup.enter.native="addTask()")
        el-input.add-task(v-else v-model="cacheTask.name" placeholder="＋Add Task" :class="{'warn': isWarn}"
                          @focus="editStatus = 'add'" @keyup.enter.native="addTask()")
      .panel-editor(v-show="editStatus")
        section.editor-title.task-title(:class="{'edit': editStatus === 'edit'}")
          p.task-input
            el-checkbox(v-if="editStatus === 'edit'" v-model="cacheTask.isCompleted" @click.prevent.native="clickCompleted(cacheTask)")
            input.input(type="text" v-model="cacheTask.name" placeholder="Type Something Here" :class="{'warn': isWarn}"
                        @keyup.enter="editStatus === 'edit' ? updateTask(cacheTask) : addTask()")
          p.task-btns
            button.btn-important(@click="clickStar(cacheTask)")
              fas-icon(:icon="[cacheTask.isStar ? 'fas' : 'far', 'star']")
        section.editor-date
          p
            fas-icon(:icon="['far', 'calendar-alt']")
            | Deadline
          el-date-picker(v-model="cacheTask.date" type="date" placeholder="yyyy/mm/dd" format="yyyy/MM/dd"
                        :picker-options={"firstDayOfWeek": 1})
        section.editor-comment
          p
            fas-icon(:icon="['far', 'comment-dots']")
            | Comment
          el-input(type="textarea" :rows="2" placeholder="Type your memo here…" v-model="cacheTask.comment")
        .editor-btns
          button.cancle(@click="cancleEditAddTask")
            fas-icon(icon="times")
            | Cancel
          button.add(v-show="editStatus === 'add'" @click="addTask")
            fas-icon(icon="plus")
            | Add Task
          button.update(v-show="editStatus === 'edit'" @click="updateTask(cacheTask)")
            fas-icon(icon="plus")
            | SAVE
      .panel-list
        .task(v-for="(task, idx) in filteredTasks" :key="task.id" :class="{'completed': task.isCompleted, 'edit': cacheTask.id === task.id}")
          .task-title
            p.task-input
              el-checkbox(v-model="task.isCompleted" @click.prevent.native="clickCompleted(task)")
              input(type="text" placeholder="Type Something Here" class="input" :value="task.name" readonly
                    @dblclick="editTask(task); editStatus = null || 'edit'")
            p.task-btns
              button.btn-important(@click="clickStar(task)")
                fas-icon(v-show="!task.isCompleted" :icon="[task.isStar ? 'fas' : 'far', 'star']")
              button.btn-edit(@click="editTask(task)")
                fas-icon(:icon="[task.isCompleted ? 'fas' : 'far', 'edit']")
              button.btn-del(@click="delTask(task)")
                fas-icon(icon="trash-alt")
          .task-icons
            span.info-date(v-if="task.date")
              fas-icon(:icon="['far', 'calendar-alt']")
              | {{task.date}}
            span.info-comment(v-if="task.comment")
              fas-icon(:icon="['far', 'comment-dots']")
              | {{task.comment}}
      .panel-count
        span {{filteredTasksCount}}  {{filteredTasksMsg}}
        button.btn-del(@click="delTasks()")
          fas-icon(icon="trash-alt")
</template>

<script>
export default {
  name: 'F2E1th01',
  data () {
    return {
      msg: 'th1-01',
      listPages: [
        {
          name: 'My Tasks',
          value: 'all'
        },
        {
          name: 'In Progress',
          value: 'progress'
        },
        {
          name: 'Completed',
          value: 'completed'
        }
      ],
      currentListPage: 'all',
      filteredTasksMsg: '',
      editStatus: null, // add / edit / null
      cacheTask: {},
      tasks: [],
      isWarn: false
    }
  },
  created () {
    this.dataLoad()
    this.defaultCacheTask()
  },
  watch: {
    tasks: {
      handler: function () {
        this.dataUpdate()
      },
      deep: true
    },
    currentListPage: {
      immediate: true,
      handler: function () {
        this.filteredTasksMsg = this.currentListPage === 'completed' ? 'task completed' : 'tasks left'
      }
    }
  },
  computed: {
    // shoow tasks
    sortedTasks () {
      return [...this.tasks].sort((a, b) =>
        a.sortBy < b.sortBy ? 1 : -1
      )
    },
    filteredTasks () {
      let currentListPage = this.currentListPage
      switch (currentListPage) {
        case 'all':
          return this.sortedTasks.filter(task => true)
        case 'progress':
          return this.sortedTasks.filter(task => !task.isCompleted)
        case 'completed':
          return this.sortedTasks.filter(task => task.isCompleted)
      }
    },
    test () {
      return this.$store.state.test
    },
    // count tasks
    filteredTasksCount () {
      return this.filteredTasks.length
    },
    progressTasksCount () {
      return this.tasks.filter(task => (!task.isCompleted)).length
    }
  },
  methods: {
    // load & update db
    dataLoad () {
      let localDb = JSON.parse(localStorage.getItem('tasks'))
      localDb ? this.tasks = localDb : this.dataUpdate()
    },
    dataUpdate () {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    // cacheTask (save=>) tasks & update db
    updateTask (curTask) {
      if (!curTask.name) {
        this.isWarn = true
        return
      }
      curTask.date = this.formateDate(curTask.date)
      this.tasks[this.getIdx(this.cacheTask.id)] = Object.assign({}, this.cacheTask)
      this.defaultCacheTask()
      this.editStatus = 'add'
      this.dataUpdate()
      this.dataLoad()
    },
    // reset cacheTask(writing)
    defaultCacheTask () {
      this.cacheTask = {
        id: null,
        name: null,
        date: null,
        comment: null,
        isStar: false,
        sortBy: null,
        isCompleted: false
      }
    },
    // find task index (select someone task)
    getIdx (id) {
      return this.tasks.findIndex((task) => task.id === id)
    },
    // task value handle
    formateDate (date) {
      if (typeof date === 'object' && date) {
        let timezone = new Date(+date + 8 * 3600 * 1000)
        return timezone.toISOString().substring(0, 10)
      }
      return ''
    },
    // main button handler
    addTask () {
      let newTaskName = this.cacheTask.name ? this.cacheTask.name.trim() : ''
      if (!newTaskName) {
        this.isWarn = true
        return
      }
      this.isWarn = false
      let submitData = {
        id: Math.floor(Date.now()),
        name: newTaskName,
        isStar: this.cacheTask.isStar,
        sortBy: this.cacheTask.isStar ? new Date().getTime() : null,
        date: this.formateDate(this.cacheTask.date),
        comment: this.cacheTask.comment,
        isCompleted: false
      }
      this.tasks.push(submitData)
      this.defaultCacheTask()
    },
    cancleEditAddTask () {
      this.cacheTask.name ? this.defaultCacheTask() : this.editStatus = null
      if (this.editStatus) {
        this.defaultCacheTask()
        this.editStatus = 'add'
      }
    },
    delTask (curTask) {
      this.tasks.splice(this.getIdx(curTask.id), 1)
      this.defaultCacheTask()
    },
    delTasks () {
      this.tasks = []
      this.dataUpdate()
    },
    editTask (curTask) {
      this.isWarn = false
      this.editStatus = 'edit'
      this.cacheTask = Object.assign({}, curTask)
    },
    clickStar (curTask) {
      if (curTask.isStar) {
        curTask.isStar = false
        curTask.sortBy = null
      } else {
        curTask.isStar = true
        curTask.sortBy = new Date().getTime()
      }
    },
    clickCompleted (curTask) {
      curTask.isCompleted = !curTask.isCompleted
      curTask.sortBy = curTask.isCompleted ? -1 : null
    }
  }
}
</script>

<style lang="scss">
// style
.f2e1-01 {
  --color-blue-1: #4A90E2;
  --color-blue-2: #00408B;
  --color-red-1: #D0021B;
  --color-yellow-1: #F5A623;
  --color-yellow-2: #FFF2DC;
  --color-gray-1: #757575;
  --color-gray-2: #C8C8C8;
  --color-gray-3: #E1E1E1;
  --color-gray-4: #F2F2F2;
  --width-content-max: 620px;
  font-size: 1rem;
  // custom-mixin
  %max-width {
    max-width: var(--width-content-max);
  }
  // custom-default style
  button {  // button style reset
    border: none;
    background: none;
  }
  * {
    box-sizing: border-box;
  }
  &.content{
    font-family: 'Roboto', sans-serif;
    background-color: var(--color-gray-3);
    @extend %mh-100vh;
    @extend %mg-auto;
  }
  .banner {
    background-color: var(--color-blue-1);
    ul {
      @extend %max-width;
      margin: auto;
      display: flex;
      li {
        @extend %text-center;
        color: var(--color-sub);
        line-height: 2.2rem;
        font-size: 1.2rem;
        flex: 1;
        cursor: pointer;
        &.active{
          color: #fff;
          font-weight: bold;
          border-bottom: 3px solid var(--color-blue-2);
        }
        &:hover{
          filter: brightness(1.2);
        }
      }
    }
  }
  .content {
    & > div[class^="panel"]{
      margin: 1rem auto;
      @extend %max-width;
      @extend %mg-auto;
    }
  }
  .task {
    &:not(.edit) {
      .task-title {
        input[type="text"]{
          border: none;
          background: none;
        }
      }
    }
    &.completed {
      .task-icons {
        display: none;
      }
      .task-title {
        input[type="text"] {
          text-decoration:line-through;
          border: none;
          background: none;
          color: #AAA;
        }
      }
    }
  }
  .task-title {
    display: flex;
    .task-input {
      flex: 1;
      @extend %flex;
      @extend %w100;
      align-items: center;
      input[type="text"] {
        @extend %w100;
        font-size: 1.2rem;
        line-height: 2rem;
      }
    }
    .task-btns {
      button {
        @include size(2.2rem);
      }
    }
  }
  .task-btns {
    svg {
      color: var(--color-gray-1);
    }
  }
  .task-icons {
    color: var(--color-gray-1);
  }
  svg[data-prefix="fas"][data-icon="star"] {
    color: var(--color-yellow-1);
  }
  .panel-add {
    .warn {
      input {
        border: 1px solid var(--color-red-1);
      }
    }
  }
  .panel-editor {
    background-color: var(--color-gray-4);
    .editor-title {
      border-bottom: 1px solid #ddd;
      font-size: 2rem;
      padding: 15px 20px;
      &.edit {
        background-color: var(--color-yellow-2);
      }
      input {
        &.warn {
          border: 1px solid var(--color-red-1);
        }
      }
    }
    .editor-date,
    .editor-comment {
      padding: 13px 40px;
      p{
        line-height: 2rem;
      }
      svg {
        margin-right: 5px;
        margin-left: -20px;
      }
    }
    .editor-btns {
      button {
        @extend %w50;
        padding: 10px;
        &.cancle {
          background-color: #fff;
          color: var(--color-red-1);
        }
        &.add,
        &.update {
          background-color: var(--color-blue-1);
          color: white;
        }
        &:hover {
          cursor: pointer;
          filter: brightness(1.1);
        }
        svg {
          margin-right: 5px;
        }
      }
    }
  }
  .panel-editor,
  .panel-list {
    .task {
      margin: 10px auto;
      padding: 10px 20px 10px 40px;
      background-color: var(--color-gray-4);
      .task-input {
        margin-left: -2rem;
        .el-checkbox {
          margin-right: .5rem;
        }
      }
      input[readonly] {
        border: none;
        background: none;
      }
      &.edit {
        background-color: var(--color-yellow-2);
      }
    }
  }
  .panel-list {
    .task-btns {
      svg {
        &:hover {
          cursor: pointer;
          filter: brightness(0.2);
        }
      }
    }
    .task-icons {
      span[class^="info"] {
        margin-right: 1.2rem;
      }
      svg {
        margin-right: .2rem;
      }
    }
  }
}

</style>
