<template>
  <div class="header">
    <img src="@/assets/logo.png">
    <div class="links">
      <router-link class="s-link" to="/home/app">Create</router-link>
      <router-link  class="s-link"  to="/home/dashboard">Dashboard</router-link>
      <router-link  class="s-link"  to="/home/blog">Blog</router-link>
      <router-link class="s-link" to="/home/profile">{{$store.state.username}}</router-link>
      <router-link class="s-link cikis" to="/">Çıkış</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
.header{
  height: 60px;
  background-color: white;
  position: sticky;
  top: 0;
  width: 100vw;
  border-bottom: 3px solid var(--pink);
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
}
.cikis{
  background-color: #823AD9!important;
}

.header img{
  height: 50px;
  padding-left: 50px;
}
.links{
  justify-self: end;
  grid-template-columns:  auto auto auto auto auto;
  display: grid;
  grid-gap: 10px;
  padding-right: 50px;
}
.s-link {
  font-size: 20px!important;
  text-decoration: none !important;
  color: var(--purple) !important;
  font-weight: bolder;
  padding: 10px;
}

.router-link-active{
  background-color: var(--pink);
  color: white !important;
  border-radius: 10px;
}
</style>