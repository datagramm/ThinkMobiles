<template>
   <table class="styled-table"  >
     <thead>
     <tr>
      <th v-for="th in rowTH" :key="th" @click="sort(th)">{{th}}</th>
     </tr>
     </thead>
     <TodoItem  v-for="todo  of todos" v-bind:todo="todo"  :key="todo" @click="selectItem(todo.id)"/>
   </table>
</template>

<script>

import TodoItem from "@/components/TodoItem.vue";
import router from "@/router";


export default {
  name: "TodoList",
  props: {
    todos: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  components:  {
    TodoItem
  },
  data(){
    return {
      rowTH: ['id', 'firstName', 'lastName', 'phoneNumber', 'mail', 'eventCount', 'firstEventDate'],
      directionOfSort: 1
    }
  },
  methods: {
    async selectItem(id){
      await  router.push({name: 'user', params: {id: id}})
      this.$emit('getCurrentUser')
       },
    sort(th){
      (this.directionOfSort === 1) ? this.directionOfSort = -1 : this.directionOfSort = 1
      this.$emit('sortBy', th, this.directionOfSort)
      this.$emit('getAllUsers', this.currentPage)


    }
      }


  }


</script>

<style scoped>
.styled-table thead tr {;
  background-color: #009879;
  color: #ffffff;

}

table {
  overflow: hidden;
  border-radius: 3vh;
  width: 100%;
  border-collapse: collapse;
  margin: 2vh;
  font-size: 0.9em;
  font-family: sans-serif;

  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.styled-table thead tr {
  border-radius: 3vh 3vh 0 0;
  background-color: #009879;
  color: #ffffff;
  text-align: center;
}
.styled-table th,
.styled-table td {
  padding: 1vh;
}

div {
  width: 100%;
}
.selected {
  transition: 0.5s;
  background-color: #009879;
  color: #FFF;
}
</style>