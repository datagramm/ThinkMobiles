<template>
<input type="button" v-on:click="logout" value="Logout">
</template>

<script>
import $ from "jquery";
import router from "@/router";

export default {
  name: "logOut",
  methods: {
    logout() {
      $.ajaxSetup({
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
      });

      $.get('http://localhost:3000/logout').then(res => {
        if (res.logout) {
          router.push({path: '/registration'})
        }
      })
    }
  }
}
</script>

<style scoped>

</style>