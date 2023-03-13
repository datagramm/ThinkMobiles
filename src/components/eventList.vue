<template>
  <table class="styled-table" @click="selectItem">
    <thead>
    <tr>
      <th>Id</th>
      <th>Tittle</th>
      <th>Description</th>
      <th>Start Date</th>
      <th>End Data</th>
    </tr>
    </thead>
    <EventItem  v-for="(event, id ) of events" v-bind:event="event" v-bind:id="id" :key="event"/>
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
    selectItem(event){

      if (event.target.tagName === 'TD'){
        this.$emit('showUserProfile',  event.target.parentElement.childNodes);

        if(this.selectedItem) {
          this.selectedItem.classList.remove('selected')
        }
        this.selectedItem =  event.target.parentElement;
        this.selectedItem.classList.add('selected')

      }
    }
    ,
    sortedRows(){
      const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

      const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
              v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
      )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));


      document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
        const table = th.closest('table');
        Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
            .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
            .forEach(tr => table.appendChild(tr) );
      })));
    }
  },
  mounted() {
    this.sortedRows();
  }
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