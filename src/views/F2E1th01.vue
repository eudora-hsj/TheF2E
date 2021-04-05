<template lang="pug">
  .f2e1-01.container
    .banner
      ul
        li(v-for="listPage in listPages" :key="listPage.value"
            :class="{'active': currentListPage===listPage.value}"
            @click="currentListPage=listPage.value")
          | {{listPage.name}}
    .content
      .panel-add
        el-input.add-task(v-model="cacheTask.name" placeholder="＋Add Task"
                          @focus="isAdd = true" @keyup.enter.native="addTask")
      .panel-editor(v-show="isAdd")
        section.editor-title.task-title
          p.task-input
            input(type="checkbox")
            input(type="text" v-model="cacheTask.name" placeholder="Type Something Here" class="input")
          p.task-btns
            button.btn-important
              fas-icon(:icon="[cacheTask.isStart ? 'fas' : 'far', 'star']"
                        @click="cacheTask.isStart=!cacheTask.isStart")
            button.btn-edit
              fas-icon(icon="pen")
        section.editor-date
          fas-icon(:icon="['far', 'calendar-alt']")
          | Deadline
          el-date-picker(v-model="cacheTask.date" type="date" placeholder="yyyy/mm/dd" format="yyyy/mm/dd").
          //- el-time-select(v-model="cacheTask.time" :picker-options="{start: \'08:30\',step: \'00:15\',end: \'18:30\'}" placeholder="hh/mm").
        //- section.editor-file
        //-   fas-icon(:icon="['far', 'file']")
        //-   | File
        //-   el-button(type='info') 
        //-     fas-icon(:icon="['fas', 'plus']")
        section.editor-comment
          fas-icon(:icon="['far', 'comment-dots']")
          | Comment
          el-input(type="textarea" :rows="2" placeholder="Type your memo here…" v-model="cacheTask.comment")
        .editor-btns
          button.cancle
            fas-icon(icon="times")
            |  Cancel
          button.add(@click="addTask")
            fas-icon(icon="plus")
            |  Add Task
          button.update(@click="updateTask")
            fas-icon(icon="plus")
            |  SAVE
      .panel-list
        .task(v-for="(task, idx) in filteredTasks" :class="{'completed': task.isCompleted, 'edit': task.isEdit}")
          .task-title
            p.task-input
              input(type="checkbox" :checked="task.isCompleted"
                    @click="task.isCompleted = !task.isCompleted")
              input(type="text" placeholder="Type Something Here" class="input" :value="task.name" :readonly="!task.isEdit"
                    @click="task.isEdit = !task.isEdit")
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
            //- span.info-date
              //- fas-icon(:icon="['far', 'file']")
              //- | {{task.file}}
            span.info-comment(v-if="task.comment")
              fas-icon(:icon="['far', 'comment-dots']")
      .panel-count
        p {{progressTasksCount}} tasks left
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
      isAdd: false,
      cacheTask: {
        id: null,
        name: '',
        isStart: false,
        date: '',
        // time: '10:00',
        comment: null,
        isCompleted: false,
        isEdit: false
      },
      tasks: [
        {
          id: 1,
          name: 'task1',
          isStart: false,
          date: '',
          // time: '08:00',
          comment: 'balabala',
          isCompleted: true,
          isEdit: false
        },
        {
          id: 2,
          name: 'task2',
          isStart: false,
          date: '',
          // time: '13:00',
          comment: 'balabala',
          isCompleted: false,
          isEdit: false
        },
        {
          id: 3,
          name: 'task3',
          isStart: false,
          date: '',
          // time: '10:00',
          comment: null,
          isCompleted: false,
          isEdit: false
        }
      ]
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
    progressTasksCount () {
      return this.tasks.filter(task => (!task.isCompleted)).length
    }
  },
  methods: {
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
      this.cacheTask = {}
    },
    getIdx (curTaskId) {
      return this.tasks.findIndex((task) => task.id === curTaskId)
    },
    delTask (curTask) {
      this.tasks.splice(this.getIdx(curTask.id), 1)
    },
    editTask (curTask) {
      this.tasks.forEach(task => (task.isEdit = false))
      this.cacheTask = curTask
    },
    updateTask () {
      // todo
      this.cacheTask = {}
    }
  }
}
</script>

<style lang="scss">
:root {
  --color-blue-1: #4A90E2;
  --color-blue-2: #00408B;
  --color-red-2: ##D0021B;
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
  background-color: var(--color-gray-3);
  @extend %mh-100vh;
  @extend %mg-auto;
  // * {
  //   outline: 1px solid red;  //test
  // }
  .banner {
    background-color: var(--color-blue-1);
    ul {
      @extend %max-width;
      margin: auto;
      display: flex;
      li {
        @extend %text-center;
        color: var(--color-sub);
        font-weight: bold;
        line-height: 2.2rem;
        font-size: 1rem;
        flex: 1;
        cursor: pointer;
        &.active{
          color: #fff;
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
        input[type="text"]{
          text-decoration:line-through;
          border: none;  //test
          background: none; //test
          color: #AAA;
        }

        // background-color: #CCC;
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
  .panel-add {}
  .panel-editor {
    background-color: var(--color-gray-4);

    .editor-btns {
      button {
        @extend %w50;
        &.cancle {
          background-color: #fff;
          color: var(--color-red-1);
        }
        &.add {
          background-color: var(--color-blue-1);
          color: white;
        }
      }
    }
  }
  .panel-list {
    .task {
      margin: 10px auto;
      padding: 10px 20px 10px 40px;
      background-color: var(--color-gray-4);
      .task-input {
        margin-left: -24px;
      }
    }
  }
}

</style>
