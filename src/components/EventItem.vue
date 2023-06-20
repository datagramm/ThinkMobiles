
<template>

  <tr>
    <td>{{event.id}}</td>
    <td>{{event.tittle}}</td>
    <td>{{event.description}}</td>
    <td>{{event.startEventDate}}</td>
    <td>{{event.endEventDate}}</td>
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