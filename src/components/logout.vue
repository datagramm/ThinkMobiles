<template>
<input type="button" v-on:click="logout" value="Logout">
</template>

<script>

import {request} from "@/api/requests";
import router from "@/router";

export default {
  name: "logOut",
  methods: {
    async logout() {
      const logoutResult = await request('/logout', 'GET')
      if (logoutResult.logout) await router.push({path: '/registration'})
      
    }
  }
}
</script>

<style scoped>

</style>