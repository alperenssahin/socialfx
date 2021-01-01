<template>
  <div class="login-box">
    <img src="@/assets/ylogo.png" alt="social fx logo">
    <div class="login-content">
      <label>
        Username <br>
        <input type="text">
      </label>
      <br>
      <label>
        Password
        <br>
        <input type="password">
      </label>
      <br>
      <button @click="loginHandler">
        Login
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  methods:{
    loginHandler(){
      this.$router.push("/home/app");
    }
  }
}
</script>

<style scoped>


.login-box {
  width: 100vw;
  height: 100vh;
  background-color: var(--yellow);
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
}


</style>