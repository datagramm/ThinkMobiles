
<template>
  <div id="app">

   <div class="menu"><logOut  class="logout-button"/>
    <h3> {{currentClientName}}, welcome to dashboard!</h3>
   </div>

    <div id="dashboard">
    <div id="profile">
      <userProfile   @showMenu="showMenu"  v-bind:currentUser="currentTodo" />

      <Transition>
        <eventAddingMenu ref="eventMenu"  v-bind:currentUser="currentTodo" v-bind:alert="showingAlert"  v-show="showingEvent"  @closeMenu="closeMenu" @pushEvent="pushEvent"/>
      </Transition>
      <EventList  v-bind:events="Events" v-bind:currentPage2="page2" @getCurrentUserEvents="getCurrentUserEvents"  @sortBy2="sortBy2"/>
      <paginate class="paginate"
                v-model="page2"
                :page-count="pageEventCount"
                :page-range="3"
                :margin-pages="1"
                :click-handler="getCurrentUserEvents"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'pagination'"
                :page-class="'page-item'"
      >
      </paginate>
    </div>
    <div id="rightSection">
      <AddUser @showMenu="showMenu"/>
      <TodoList  v-bind:todos="todos" v-bind:currentPage="page" @sortBy="sortBy"  @getAllUsers="getAllUsers"  @getCurrentUser="getCurrentUser" />
      <paginate class="paginate"
                v-model="page"
                :page-count="pageCount"
                :page-range="3"
                :margin-pages="1"
                :click-handler="getAllUsers"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'pagination'"
                :page-class="'page-item'"
      >
      </paginate>
    </div>
    <userAddingMenu v-show="showingMenu" @closeMenu="closeMenu"  @pushUser="pushUser" />
    </div>
  </div>
</template>

<script>



import TodoList from "@/components/TodoList.vue";
import AddUser from "@/components/addUser.vue";
import Paginate from "vuejs-paginate-next";
import userAddingMenu from "@/components/userAddingMenu.vue";
import userProfile from "@/components/userProfile.vue";
import EventList from "@/components/eventList.vue";
import eventAddingMenu from "@/components/eventAddingMenu.vue";
import logOut from "@/components/logout.vue"
import {request} from "@/api/requests";




export default {
  name: 'dashBoard',
  data(){
    return {
      todos: [],
      Events: [],
      page: 1,
      page2: 1,
      pageCount: 0,
      pageEventCount: 0,
      showingMenu: false,
      showingAlert: false,
      showingEvent: false,
      currentTodo: {},
      accessToRoute: false,
      currentClientName: '',
      sorted: 'id',
      sorted2: 'id',
      direction: 1,
      direction2: 1,
    }
  },

  methods: {



    pushUser(){
   this.getAllUsers(this.page, 'id')
    },
    pushEvent(event){
      if (event.error) {
        this.showingAlert = true
        setTimeout(() => this.showingAlert = false, 2000)
        return
      }
      console.log(this.showingAlert)
      this.getAllUsers(1);



    },

    async getCurrentUser(){
      const id = await this.$route.params.id
      const currentUser = await request(`/dashboard/user/${id}`, 'GET')

      this.currentTodo = {
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        phone: currentUser.phoneNumber,
        mail: currentUser.mail,
      }
      console.log(this.currentTodo)
     await this.getCurrentUserEvents()

    },



    showMenu(value){
      if (value === 'showUserMenu') this.showingMenu = true
      if (value === 'showEventMenu') this.showingEvent = true
    },
    closeMenu(value){
      if (value === 'closeUserMenu') this.showingMenu = false
      if (value === 'closeEventMenu') this.showingEvent = false
    },

    async getCurrentUserEvents(page = 1){

      const currentUser = await request('/dashboard/getCurrentUserEvents', 'GET',
          {
            currentUser: this.currentTodo,
            page: page,
            sortValue: this.sorted2,
            sortDirection: this.direction2,
          }
      )
      this.Events = currentUser.user
      this.page2 = currentUser.page
      this.pageEventCount = currentUser.pages


    },
    sortBy2(th, direction){
      this.sorted2 = th
      this.direction2 = direction
    },

    sortBy(th, direction){
      this.sorted = th
      this.direction = direction
    },

    async getAllUsers(page){
      this.todos = []
      const allUsers = await request('/dashboard/getAllUsers', 'GET', {
        page: page,
        sortValue: this.sorted,
        sortDirection: this.direction
      })
      this.currentClientName =  allUsers.currentUser;
      this.todos = allUsers.users
      this.page = allUsers.page
      this.pageCount = +allUsers.pages


    }
  },
   mounted() {
    this.getAllUsers(this.page);

  },


  components: {
    EventList,
    TodoList, AddUser,Paginate, userAddingMenu, userProfile, eventAddingMenu, logOut
  }
}
</script>

<style scoped>
#app{
  margin: 2vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.menu{

  display: flex;
  align-items: center;
  gap: 1vh;

}
#dashboard {
  margin-top: 1vh;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
#profile {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  height: 70%;
  background: lightblue;
  border-radius: 3vh;
}
#rightSection {
  margin: 1vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  height: 70%;
  border-radius: 3vh;
}
.paginate{
  width: 100%;
  display: flex;
  justify-content: center;

}
.logout-button {
  padding: 1vh;
  color: white;
  background: darkgrey;
  border: none;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  border-radius: 1vh;

  left: 5vh;
  top: 5vh;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;

}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}


@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";

</style>
