<template>
  <div class="user-adding-menu">
    <button class="closeButton" v-on:click="closeMenu">&times;</button>
    <form @submit.prevent="onSubmit" class="form-adding-user">
      <input type="text" v-model="firstName" placeholder="@firstName">
      <input type="text" v-model="lastName" placeholder="@lastName">
      <input type="text" v-model="mail" placeholder="@mail">
      <input type="text" v-model="phoneNumber" placeholder="@phoneNumber">
      <input type="submit" value="Send" class="submit">
    </form>
  </div>
</template>

<script>
import $ from "jquery"

export default {
  name: "userAddingMenu",
  data() {
    return {
      firstName: '',
      lastName: '',
      mail: '',
      phoneNumber: '',

    }
  },
  methods: {
    closeMenu() {
      this.$emit('closeMenu', 'closeUserMenu');
      this.firstName = ''
      this.lastName = ''
      this.mail = ''
      this.phoneNumber = ''
    },
    onSubmit() {
      if (this.firstName.trim() && this.mail.trim() && this.lastName.trim() && this.phoneNumber.trim()) {
        $.post('http://localhost:3000/pushUser', {
          firstName: this.firstName,
          lastName: this.lastName,
          mail: this.mail,
          phoneNumber: this.phoneNumber

        }).then(res => {
          console.log(res);
          this.$emit('pushUser', res);
          this.firstName = ''
          this.lastName = ''
          this.mail = ''
          this.phoneNumber = ''
        })

      }
    }
  }

}
</script>

<style scoped>
.user-adding-menu {
  z-index: 1000;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -11%;
  padding: 7vh;
  position: fixed;
  border-radius: 3vh;
  width: 22%;
  height: max-content;
  background: white;
  filter: drop-shadow(0 0 0.75rem grey);
}

.closeButton {
  transition: 0.5s;
  opacity: 0.8;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 5vh;
  height: 5vh;
  position: absolute;
  background: indianred;
  right: 2vh;
  top: 2vh;
  border-radius: 1vh;
}
.closeButton:hover , .submit:hover{
  opacity: 1;
}
.form-adding-user {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.form-adding-user > * {
  width: 100%;
  margin: 1vh;
  padding: 1vh;
  border-radius: 1vh;
  border: none;
  outline: none;
  background: lightgrey;
}
  .submit  {
    transition: 0.5s;
    opacity: 0.5;
    color: white;
  background: orange;
}
</style>