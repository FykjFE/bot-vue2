<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <service-demo></service-demo>
  </div>
</template>

<script>
export default {
  components: {},
  async mounted() {
    // let res = await this.$service.demo.getData();
    // console.log(JSON.stringify(res));

    console.log(this.$service.demo.getData);
  },
  computed: {},
  methods: {}
};
</script>
