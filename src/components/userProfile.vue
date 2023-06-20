<template>
<div class="user-profile">
  <h2>id: {{id}}</h2>
  <h2>firstName: {{firstName}}</h2>
  <h2>lastName: {{lastName}}</h2>
  <h2>phone: {{phone}}</h2>
  <h2>mail: {{mail}}</h2>
  <button type="button" class="create-event" v-on:click="onSubmit">Create event</button>

</div>
</template>

<script>


import {request} from "@/api/requests";

export default {
  name: "userProfile",
  data(){
    return {
      id: '',
      firstName: '',
      lastName: '',
      phone: '',
      mail: '',
    }
  },

  methods: {
    onSubmit(){
      this.$emit('showMenu', 'showEventMenu');
    },

    async getCurrentUser(){
      const id = this.$route.params.id
      const currentUser = await request(`/dashboard/user/${id}`, 'GET')
      this.id = currentUser.id
      this.firstName = currentUser.firstName
      this.lastName = currentUser.lastName
      this.phone = currentUser.phoneNumber
      this.mail = currentUser.mail

      this.$emit('showUserProfile', {
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        phone: currentUser.phoneNumber,
        mail: currentUser.mail

      })
      this.$emit('getCurrentUserEvents', {
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        phone: currentUser.phoneNumber,
        mail: currentUser.mail
      })
    },

  },
     mounted() {
    this.getCurrentUser()
  },

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