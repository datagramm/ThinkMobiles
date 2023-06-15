<template>
  <div class="container">
    <form v-on:submit="loginUser" class="registration-form">
      <h4>Login form</h4>
      <input type="text" v-model="login" placeholder="@login">
      <input type="password" v-model="password" placeholder="@password">
      <button type="submit">Sign in</button>
      <router-link to="/registration" style="color: white; text-decoration: none">
        <button type="button" style="background: cornflowerblue" >Sign up</button>
      </router-link>
      <Transition>
        <showTooltip  v-show="showingTooltip " v-bind:tooltipText="tooltipText"/>
      </Transition>
    </form>
  </div>
</template>

<script>
import $ from "jquery"
import ShowTooltip from "@/components/showTooltip";
import router from "@/router";
export default {
  name: "loginMenu"
  ,

  components: {ShowTooltip},
  data() {
    return{
      login: '',
      password: '',
      showingTooltip: false,
      tooltipText: '',
    }
  },
  methods: {
    showTooltip(message){
      this.tooltipText = message
      this.showingTooltip = true
      setTimeout(() => {
        this.showingTooltip = false
      }, 1000)
    },
    loginUser(){
      if (this.login.trim() && this.password.trim()){
        $.ajaxSetup({
          crossDomain: true,
          xhrFields: {
            withCredentials: true
          },
        });

        $.post('http://localhost:3000/login', {
          username: this.login,
          password: this.password,
        },
        ).then(res => {
          this.login = ''
          this.password = ''
          if (res.err)  this.showTooltip(res.message)
          else {
            setTimeout(() => {router.push({path: '/dashboard'})}, 1000)
          }
        })
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