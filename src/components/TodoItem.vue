
<template>

    <tr>
      <router-link :to="'dashboard/user/' + todo.id">
      <td>{{todo.id}}</td>
      <td>{{todo.firstName}}</td>
      <td>{{todo.lastName}}</td>
      <td>{{todo.phoneNumber}}</td>
      <td>{{todo.mail}}</td>
      <td>{{todo.eventCount}}</td>
      <td>{{isEmpty(todo.firstEventDate)}}</td>
      </router-link>
    </tr>


</template>

<script>
export default {
  name: "TodoItem",
  props: {
    id: {
      type: Number,
      required: true,
    },
    todo: {
      type: Object,
      required: true,
    }
  },
  computed: {
    isEmpty() {
       return (v) => {
         if (v == 0) {
           return 'not event available'
         }
         else return  v
       }
    }

  }
}
</script>

<style scoped>



</style>