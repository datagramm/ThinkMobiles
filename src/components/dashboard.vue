
<template>
  <div id="app">

   <div class="menu"><logOut  class="logout-button"/>
    <h3> {{currentClientName}}, welcome to dashboard!</h3>
   </div>

    <div id="dashboard">
    <div id="profile">
      <userProfile v-bind:currentUser="currentTodo"  @showMenu="showMenu"/>

      <Transition>
        <eventAddingMenu ref="eventMenu"  v-bind:currentUser="currentTodo" v-bind:alert="showingAlert"  v-show="showingEvent"  @closeMenu="closeMenu" @pushEvent="pushEvent"/>
      </Transition>
      <EventList  v-bind:events="paginatedEvents" />
      <paginate class="paginate"
                v-model="page2"
                :page-count="pageEventCount"
                :page-range="3"
                :margin-pages="1"
                :click-handler="clickCallback2"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'pagination'"
                :page-class="'page-item'"
      >
      </paginate>
    </div>
    <div id="rightSection">
      <AddUser @showMenu="showMenu"/>
      <TodoList  v-bind:todos="paginatedTodos"  @showUserProfile="showUserProfile"  @getCurrentUserEvents="getCurrentUserEvents"/>
      <paginate class="paginate"
                v-model="page"
                :page-count="pageCount"
                :page-range="3"
                :margin-pages="1"
                :click-handler="clickCallback"
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

import $ from 'jquery';
import lodash from 'lodash';
import TodoList from "@/components/TodoList.vue";
import AddUser from "@/components/addUser.vue";
import Paginate from "vuejs-paginate-next";
import userAddingMenu from "@/components/userAddingMenu.vue";
import userProfile from "@/components/userProfile.vue";
import EventList from "@/components/eventList.vue";
import eventAddingMenu from "@/components/eventAddingMenu.vue";
import logOut from "@/components/logout.vue"

export default {
  name: 'dashBoard',
  data(){
    return {
      todos: [],
      Events: [],
      paginatedEvents: [],
      paginatedTodos: [],
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
    }
  },

  methods: {
    clickCallback(pageNum) {
      this.page = pageNum;
      this.paginatedTodos = lodash.chunk(this.todos, 5);
      console.log(pageNum);
      this.pageCount = this.paginatedTodos.length;
      if (this.todos.length === 1) this.paginatedTodos = this.paginatedTodos[pageNum]
      else this.paginatedTodos = this.paginatedTodos[pageNum-1];

    },
    clickCallback2(pageNum) {


      this.page2 = pageNum;
      this.paginatedEvents = lodash.chunk(this.Events, 5);
      this.pageEventCount = this.paginatedEvents.length;

      if (this.Events.length === 1) {this.paginatedEvents = this.paginatedEvents[0]}
      else {

        this.paginatedEvents = this.paginatedEvents[pageNum-1];
      }

    },


    pushUser(user){
      this.todos.push(user);
      this.clickCallback(this.pageCount)
    },
    pushEvent(event){
      if (event.error) {
        this.showingAlert = true
        setTimeout(() => this.showingAlert = false, 2000)
        return
      }
      console.log(this.showingAlert)
      this.Events.push(event);

      this.clickCallback2(this.pageEventCount);
      this.getAllUsers();



    },
    showUserProfile(user){

      this.currentTodo = {
        id: user[0].textContent,
        firstName: user[1].textContent,
        lastName: user[2].textContent,
        phone: user[3].textContent,
        mail: user[4].textContent,
      }


    },
    showMenu(value){
      if (value === 'showUserMenu') this.showingMenu = true
      if (value === 'showEventMenu') this.showingEvent = true
    },
    closeMenu(value){
      if (value === 'closeUserMenu') this.showingMenu = false
      if (value === 'closeEventMenu') this.showingEvent = false
    },

    getCurrentUserEvents(user){

      $.ajaxSetup({
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
      });
      $.post('http://localhost:3000/getCurrentUserEvents', {
        id: user[0].textContent,
        firstName: user[1].textContent,
        lastName: user[2].textContent,
        phone: user[3].textContent,
        mail: user[4].textContent,
      }).then(user => {

        this.Events = user.events;
      }).then(() =>{

        this.clickCallback2(1)

      })

    },
    getAllUsers(){

      $.ajaxSetup({
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
      });

      $.get('http://localhost:3000/getAllUsers').then(async users => {
        this.todos = []
        console.log(users.currentUser)
        this.currentClientName =  users.currentUser;
        users.users.forEach(user => this.todos.push(user)
        )})
          .then(() => {
            if (this.todos.length > 1) this.clickCallback(this.page)

            else  this.clickCallback(0)
          })
    }
  },
  mounted () {
    this.getAllUsers();


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
