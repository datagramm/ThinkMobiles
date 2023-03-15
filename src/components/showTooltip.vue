<template>

  <div>
    {{tooltipText}}
  </div>

</template>

<script>
export default {
  name: "showTooltip",
  props:{
    tooltipText: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped>
div {
  padding: 0;
  margin: 0;
  transition: 1s;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80%;
  height: max-content;
  background: white;
  border-radius: 1vh;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);;
}


</style>