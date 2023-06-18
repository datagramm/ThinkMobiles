<template>
  <div class="container">
<form v-on:submit="registerUser" class="registration-form">
  <h4>Registration form</h4>
  <input type="text" v-model="login" placeholder="@login">
  <input type="text" v-model="mail" placeholder="@mail">
  <input type="password" v-model="password" placeholder="@password">
  <button type="submit">Sign up</button>
  <router-link to="/login" style="color: white; text-decoration: none">
  <button type="button" style="background: cornflowerblue" >Sign in</button>
  </router-link>
  <Transition>
    <showTooltip  v-show="showingTooltip " v-bind:tooltipText="tooltipText"/>
  </Transition>
</form>
  </div>
</template>

<script>
import {request} from "@/api/requests";
import ShowTooltip from "@/components/showTooltip";
import router from "@/router";
export default {
  name: "registrationForm"
  ,
  components: {ShowTooltip},
  data() {
    return{
      login: '',
      mail: '',
      password: '',
      showingTooltip: false,
      tooltipText: '',
    }
  },
  methods: {
    showTooltip(){
      this.tooltipText = 'You have successfully registered'
      this.showingTooltip = true
      setTimeout(() => {
        this.showingTooltip = false
      }, 1000)
    },
   async registerUser(){
      if (this.login.trim() && this.mail.trim() && this.password.trim()){

       const registrationResult = await request('/authorization/registration', 'POST', {
         username: this.login,
         password: this.password,
         mail: this.mail,
       })

        this.login = ''
        this.mail = ''
        this.password = ''

        if (registrationResult.err) return alert(`Something wrong, errorName: ${registrationResult.err.name}`)
        else {
          this.showTooltip()
          setTimeout(() => {router.push({path: '/login'})}, 1000)
        }

      }

    }
  }
}
</script>

<style scoped>
.registration-form {
  box-sizing: border-box;
  padding: 2vh;
  height: max-content;
  max-width: fit-content;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 1vh;
  background: white;
  filter: drop-shadow(0 0 0.75rem darkgrey);
}
input, button {
  padding: 1vh;
  margin: 1vh;
  background: lightgray;
  width: 80%;
  border-radius: 1vh;
  border: none;
  outline: none;
}
button {

  font-weight: bold;
  background: orange;
  color: white;
  width: fit-content;
}

    .container {
      width: 100%;
      height: 100vh;
  display: flex;
  justify-content: center;
      flex-direction: column;
  align-items: center;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>