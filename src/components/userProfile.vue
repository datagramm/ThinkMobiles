<template>
<div class="user-profile">
  <h2>id: {{currentUser.id}}</h2>
  <h2>firstName: {{currentUser.firstName}}</h2>
  <h2>lastName: {{currentUser.lastName}}</h2>
  <h2>phone: {{currentUser.phone}}</h2>
  <h2>mail: {{currentUser.mail}}</h2>
  <button type="button" class="create-event" v-on:click="onSubmit">Create event</button>

</div>
</template>

<script>
export default {
  name: "userProfile",
  props: {
    id: {
      type: Number,
      required: true,
    },
    currentUser: {
      type: Object,
      required: true,
    }
  },
  methods: {
    onSubmit(){
      this.$emit('showMenu', 'showEventMenu');
    }
  }
}
</script>

<style scoped>
.user-profile {
  width: 100%;
}
.create-event{
  transition: 0.5s;
  opacity: 0.5;
  border-radius: 1vh;
  border: none;
  background: orange;
  color: white;
}
.create-event:hover{
  opacity: 1;
}

</style>