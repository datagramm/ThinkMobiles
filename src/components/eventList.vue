<template>
  <table class="styled-table" >
    <thead>
    <tr>
      <th>Id</th>
      <th>Tittle</th>
      <th>Description</th>
      <th>Start Date</th>
      <th>End Data</th>
    </tr>
    </thead>
    <EventItem  v-for="(event) of events" v-bind:event="event"  :key="event"/>
  </table>
</template>

<script>

import EventItem from "@/components/EventItem.vue";
export default {
  name: "EventList",
  props: ['events'],
  components:  {
    EventItem,
  },
  data(){
    return {
      selectedItem: undefined,
    }
  },
  methods: {


  },

}
</script>

<style scoped>
.styled-table thead tr {;
  background-color: #009879;
  color: #ffffff;

}

table {
  overflow: hidden;
  border-radius: 3vh;
  width: 80%;
  border-collapse: collapse;
  margin: 2vh;
  font-size: 0.9em;
  font-family: sans-serif;

  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.styled-table thead tr {
  border-radius: 3vh 3vh 0 0;
  background-color: #009879;
  color: #ffffff;
  text-align: center;
}
.styled-table th,
.styled-table td {
  padding: 1vh;
}

div {
  width: 100%;
}
.selected {
  transition: 0.5s;
  background-color: #009879;
  color: #FFF;
}
</style>