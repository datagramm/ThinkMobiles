
<template>


  <button type="submit" v-on:click="onSubmit">Add user</button>
</template>

<script>

export default {
  name: "addUser",
  data() {
    return {
     userName: '',
      mail: '',
    }
  },
  methods: {
    onSubmit(){
    this.$emit('showMenu', 'showUserMenu');
    }
  }
}
</script>

<style scoped>
input {
  background: lightgrey;
  padding: 1vh;
  border-radius: 1vh;
  outline: none;
  border: none;
  margin-right: 1vh;
}
button {
  transition: 0.5s;
  opacity: 0.5;
  padding: 1vh;
  background: orange;
  color: white;
  border-radius: 1vh;
  outline: none;
  border: none;
}
button:hover{
opacity: 1;
}
input::placeholder {
  color: black;
  opacity: 0.5;
}
</style>

