<template lang="pug">
  .f2e1-01.container
    .banner
      ul
        li(v-for="listPage in listPages" :key="listPage.value"
            :class="{'active': currentListPage === listPage.value}"
            @click="currentListPage=listPage.value")
          | {{listPage.name}}
    .content
      .panel-add
        el-input.add-task(v-if="editStatus === 'edit'" placeholder="＋Add Task"
                          @focus="defaultCacheTask(); editStatus = 'add';" @keyup.enter.native="addTask")
        el-input.add-task(v-else v-model="cacheTask.name" placeholder="＋Add Task"
                          @focus="editStatus = 'add'" @keyup.enter.native="addTask")
      .panel-editor(v-show="editStatus")
        section.editor-title.task-title
          p.task-input
            el-checkbox(v-model="cacheTask.isCompleted" @click="cacheTask.isCompleted = !cacheTask.isCompleted")
            input.input(type="text" v-model="cacheTask.name" placeholder="Type Something Here" @keyup.enter="addTask")
          p.task-btns
            button.btn-important
              fas-icon(:icon="[cacheTask.isStart ? 'fas' : 'far', 'star']"
                        @click="cacheTask.isStart=!cacheTask.isStart")
            button.btn-edit
              fas-icon(icon="pen")
        section.editor-date
          p
            fas-icon(:icon="['far', 'calendar-alt']")
            | Deadline
          el-date-picker(v-model="cacheTask.date" type="date" placeholder="yyyy/mm/dd" format="yyyy/MM/dd").
          //- el-time-select(v-model="cacheTask.time" :picker-options="{start: \'08:30\',step: \'00:15\',end: \'18:30\'}" placeholder="time").
        //- section.editor-file
        //-   fas-icon(:icon="['far', 'file']")
        //-   | File
        //-   el-button(type='info') 
        //-     fas-icon(:icon="['fas', 'plus']")
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
          button.update(v-show="editStatus === 'edit'" @click="updateTask")
            fas-icon(icon="plus")
            | SAVE
      .panel-list
        .task(v-for="(task, idx) in filteredTasks" :class="{'completed': task.isCompleted, 'edit': cacheTask.id === task.id}")
          .task-title
            p.task-input
              el-checkbox(v-model="task.isCompleted" @click="task.isCompleted = !task.isCompleted")
              input(type="text" placeholder="Type Something Here" class="input" :value="task.name" readonly
                    @dblclick="editTask(task); editStatus = null || 'edit'")
            p.task-btns
              button.btn-important
                fas-icon(:icon="[task.isStart && !task.isCompleted ? 'fas' : 'far', 'star']"
                        @click="task.isStart=!task.isStart")
              //- button.btn-edit(@click="editTask(task)")
              button.btn-edit(@click="editTask(task); task.isEdit = !task.isEdit")
                fas-icon(:icon="[task.isCompleted ? 'fas' : 'far', 'edit']")
              button.btn-del(@click="delTask(task)")
                fas-icon(icon="trash-alt")
          .task-icons
            span.info-date(v-if="task.date")
              fas-icon(:icon="['far', 'calendar-alt']")
              | {{task.date}}
            span.info-comment(v-if="task.comment")
              fas-icon(:icon="['far', 'comment-dots']")
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
      editStatus: null, // add / edit / null'
      cacheTask: {},
      tasks: []
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
    filteredTasks () {
      let currentListPage = this.currentListPage
      switch (currentListPage) {
        case 'all':
          return this.tasks.filter(task => true)
        case 'progress':
          return this.tasks.filter(task => !task.isCompleted)
        case 'completed':
          return this.tasks.filter(task => task.isCompleted)
      }
    },
    filteredTasksCount () {
      return this.filteredTasks.length
    },
    progressTasksCount () {
      return this.tasks.filter(task => (!task.isCompleted)).length
    }
  },
  methods: {
    dataLoad () {
      let localDb = JSON.parse(localStorage.getItem('tasks'))
      localDb ? this.tasks = localDb : this.dataUpdate()
    },
    dataUpdate () {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    defaultCacheTask () {
      this.cacheTask = {
        id: null,
        name: null,
        date: null,
        // time: null,
        comment: null,
        isStart: false,
        isCompleted: false
      }
    },
    getIdx (id) {
      return this.tasks.findIndex((task) => task.id === id)
    },
    addTask () {
      let newTaskName = this.cacheTask.name ? this.cacheTask.name.trim() : ''
      if (!newTaskName) { return }
      let submitData = {
        id: Math.floor(Date.now()),
        name: newTaskName,
        isStart: false,
        date: this.cacheTask.date ? `${this.cacheTask.date.toISOString().substring(0, 10)}` : '',
        comment: this.cacheTask.comment,
        isCompleted: false
      }
      this.tasks.push(submitData)
      this.defaultCacheTask()
    },
    cancleEditAddTask () {
      this.cacheTask.name ? this.defaultCacheTask() : this.editStatus = null
      if (this.editStatus) this.defaultCacheTask()
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
      this.editStatus = 'edit'
      this.cacheTask = curTask
    },
    updateTask (curTask) {
      this.tasks[this.getIdx(this.cacheTask.id)] = this.cacheTask
      this.defaultCacheTask()
      this.editStatus = 'add'
    }
  }
}
</script>

<style lang="scss">
:root {
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
}

%max-width {
  max-width: var(--width-content-max);
}

%mg-auto{
  margin: auto;
}
%w100{
  width: 100%;
}
%mh-100vh{
  min-height: 100vh;
}
%w50{
  width: 50%;
}
%text-center{
  text-align: center;
}

%flex{
  display: flex;
}

// custom-default style

button {  // button style reset
  border: none;
  background: none;
}
* {
  box-sizing: border-box;
}

.f2e1-01 {
  &.container{
    font-family: 'Roboto', sans-serif;
    background-color: var(--color-gray-3);
    @extend %mh-100vh;
    @extend %mg-auto;
    // * {
    //   outline: 1px solid red;  //test
    // }

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
        font-size: 1rem;
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
          border: none;  //test
          background: none; //test
        }
      }
    }
    &.edit {

    }
    &.completed {
      .task-icons {
        display: none;
      }
      .task-title {
        input[type="text"] {
          text-decoration:line-through;
          border: none;  //test
          background: none; //test
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
      input[type="text"] {
        @extend %w100;
      }
    }
    .task-btns {
      button {
        width: 2rem;
      }
    }
  }
  .task-icons {
    color: var(--color-gray-1);
  }
  .btn-important svg[data-prefix="fas"] {
    color: var(--color-yellow-1);
  }
  // .panel-add {}
  .panel-editor {
    background-color: var(--color-gray-4);
    .editor-title {
      border-bottom: 1px solid #ddd;
      font-size: 2rem;
      padding: 15px 20px;
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
        margin-left: -24px;
      }
      input[readonly] {
        border: none;  //test
        background: none; //test
      }
      &.edit {
        background-color: var(--color-yellow-2);
      }
    }
  }
  .panel-list {
    .task-btns {
      svg {
        color: var(--color-gray-1);
        &:hover{
          cursor: pointer;
          filter: brightness(0.2);
        }
      }
    }
  }
}

</style>
