
<template>

  <tr>
    <td>{{event.events.id}}</td>
    <td>{{event.events.tittle}}</td>
    <td>{{event.events.description}}</td>
    <td>{{event.events.startEventDate}}</td>
    <td>{{event.events.endEventDate}}</td>
  </tr>

</template>

<script>
export default {
  name: "EventItem",
  props: {

    event: {
      type: Object,
      required: true,
    }
  },
  computed: {
    isEmpty() {
      return (v) => {
        if (v == 0) {
          return 'not event available'
        }
      }
    }

  }
}
</script>

<style scoped>



</style>