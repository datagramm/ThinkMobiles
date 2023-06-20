<template>
   <table class="styled-table"  >
     <thead>
     <tr>
       <th>Id</th>
       <th>Name</th>
       <th>Surname</th>
       <th>Phone</th>
       <th>Mail</th>
       <th>Count</th>
       <th>Next Event Start</th>
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
  props: ['todos'],
  components:  {
    TodoItem
  },
  data(){
    return {
      selectedItem: undefined,
    }
  },
  methods: {
    selectItem(id){
      router.push({name: 'user', params: {id: id}})

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