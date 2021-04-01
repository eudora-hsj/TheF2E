<template lang="pug">
  .f2e1-01.container
    .banner
      ul
        li(v-for="page in pages" :key="page.item" :class="{'active': currentPage===page.item}" @click="currentPage=page.item")
          | {{page.title}}
    .panel-editor
      .editor-add
        el-input.add-task(v-model="inputAddTask" placeholder="＋Add Task")
      .editor-title
        input(type="checkbox")
        input(type="text" placeholder="Type Something Here" class="input")
        .title-btns
          button.btn-start
            //- fas-icon(:icon="['fas', 'star']")
            fas-icon(:icon="['far', 'star']")
          button.btn-pen
            fas-icon(icon="pen")
      section
        fas-icon(:icon="['far', 'calendar-alt']")
        | Deadline
        el-date-picker(v-model="item.date" type="date" placeholder="yyyy/mm/dd" format="yyyy/mm/dd").
        //- el-time-select(v-model="item.time" :picker-options="{start: \'08:30\',step: \'00:15\',end: \'18:30\'}" placeholder="hh/mm").
      section
        fas-icon(:icon="['far', 'file']")
        | File
        el-button(type='info') 
          fas-icon(:icon="['fas', 'plus']")
      section
        fas-icon(:icon="['far', 'comment-dots']")
        | Comment
        el-input(type="textarea" :rows="2" placeholder="Type your memo here…" v-model="item.comment")

      .editor-content
      .editor-btns
        button.cancle
          fas-icon(icon="times")
          |  Cancel
        button.add
          fas-icon(icon="plus")
          |  Add Task
    .panel-list
</template>

<script>
export default {
  name: 'F2E1th01',
  data () {
    return {
      msg: 'th1-01',
      pages: [
        {
          item: 'task',
          title: 'My Tasks'
        },
        {
          item: 'progress',
          title: 'In Progress'
        },
        {
          item: 'completed',
          title: 'Completed'
        }
      ],
      currentPage: 'task',
      inputAddTask: '',
      item: {
        comment: '',
        date: '',
        time: ''
      }
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

.f2e1-01 {
  background-color: var(--color-gray-3);
  @extend %mh-100vh;
  @extend %mg-auto;
  // * {
  //   outline: 1px solid red;  //test
  // }
  button {  // button style reset
    border: none;
    background: none;
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
  .panel-editor, .panel-list{
    @extend %max-width;
    @extend %mg-auto;
  }
  .panel-editor {
    background-color: var(--color-gray-4);
    // .editor-add {
    //   .add-task {
    //   }
    // }
    .editor-title {
      display: flex;
      .input {
        flex: 1;
        input {
          @extend %w100;
        }
      }
      .title-btns {
      }
    }
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
}

</style>
