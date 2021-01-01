<template>
      <div class="content-box">
          <Header></Header>
          <router-view></router-view>
      </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "index",
  components: {Header}
}
</script>

<style scoped>
  .content-box{
    width: 100vw;
    min-width: 100vh;
  }

</style>