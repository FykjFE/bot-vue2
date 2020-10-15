<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
  name: "Home",
  components: {},
  async mounted() {
    let res = await this.$service.demo.getData();
    console.log(JSON.stringify(res));
  }
};
</script>
