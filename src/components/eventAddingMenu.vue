<template>
  <div class="user-adding-menu">
    <button class="closeButton" v-on:click="closeMenu">&times;</button>
    <form @submit.prevent="onSubmit" class="form-adding-user">
      <input type="text" v-model="tittle" placeholder="@tittle">
      <input type="text" v-model="description" placeholder="@description">

      <div>
        <h5>Start event date</h5>
        <select v-model="startEventYear">
        <option v-for="item of items" :key="item">{{item}}</option>
      </select>
        <select v-model="startEventMonth">
          <option v-for="n in 12" :key="n">{{n}}</option>
        </select>
        <select v-model="startEventDay">
          <option v-for="n in 31" :key="n">{{n}}</option>
        </select>
      </div>
      <div>
        <h5>End event date</h5>
        <select v-model="endEventYear">
          <option v-for="item of items" :key="item">{{item}}</option>
        </select>
        <select v-model="endEventMonth">
          <option v-for="n in 12" :key="n">{{n}}</option>
        </select>
        <select v-model="endEventDay">
          <option v-for="n in 31" :key="n">{{n}}</option>
        </select>
      </div>
      <input type="submit"  value="Send" class="submit">
    </form>
    <Transition>
    <showAlert  v-show="alert || tooltip "/>
    </Transition>
  </div>
</template>

<script>
import $ from "jquery"
import showAlert from "@/components/showAlert";

export default {
  name: "eventAddingMenu",
  components: {showAlert},
  props: {
    alert: {
      type: Boolean,
      required: true,
    },
    currentUser: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
      tooltip: false,
      items:[2023,2024],
      tittle: '',
      description: '',
      startEventYear:'',
      startEventMonth: '',
      startEventDay:  '',
      endEventYear: '',
      endEventMonth: '',
      endEventDay:'',
    }
  },
  methods: {
    closeMenu() {
      this.$emit('closeMenu', 'closeEventMenu');
      this.tittle = ''
      this.description = ''
      this.startEventYear = ''
      this.startEventMonth = ''
      this.startEventDay = ''
      this.endEventYear = ''
      this.endEventMonth = ''
      this.endEventDay = ''
    },
    onSubmit() {
        console.log(this.startEventYear)
      if ( this.tittle.trim() && this.description.trim() && this.startEventYear.trim() && this.startEventMonth &&
          this.startEventDay.trim() && this.endEventYear.trim() && this.endEventMonth.trim()
          && this.endEventDay.trim()
      ) {

        if ((new Date(`${this.startEventYear}/${this.startEventMonth}/${this.startEventDay}`).setHours(0,0,0,0) <
         new Date().setHours(0,0,0,0)) || (new Date(`${this.endEventYear}/${this.endEventMonth}/${this.endEventDay}`).setHours(0,0,0,0) <
            new Date().setHours(0,0,0,0)) || (new Date(`${this.startEventYear}/${this.startEventMonth}/${this.startEventDay}`).setHours(0,0,0,0) >
             new Date(`${this.endEventYear}/${this.endEventMonth}/${this.endEventDay}` ).setHours(0,0,0,0))) {
          this.tooltip = true
          setTimeout(() => {this.tooltip = false},  1000);
          return
        }

        $.post('http://localhost:3000/pushEvent', {
          currentUser: this.currentUser,
          event: {
            tittle: this.tittle,
            description: this.description,
            startEventYear: this.startEventYear,
            startEventMonth: this.startEventMonth,
            startEventDay: this.startEventDay,
            endEventYear: this.endEventYear,
            endEventMonth: this.endEventMonth,
            endEventDay: this.endEventDay,
          }

        }).then(event => {
          this.$emit('pushEvent', event);
          this.tittle = ''
          this.description = ''
          this.startEventYear = ''
          this.startEventMonth = ''
          this.startEventDay = ''
          this.endEventYear = ''
          this.endEventMonth = ''
          this.endEventDay = ''
        })

      }
    }
  },


}

</script>

<style scoped>
.user-adding-menu {
  z-index: 1000;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-left: -11%;
  padding: 7vh;
  position: fixed;
  border-radius: 3vh;
  width: 22%;
  height: fit-content;
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
select {
  border-radius: 1vh;
  border: none;
  margin: 1vh;
}
h5{
  color: black;
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