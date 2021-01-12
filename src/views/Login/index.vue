<template>
  <div>
    <div v-if="loader">
        <Loader :progress-array="[{text:'Oturum Açılıyor',progress:40,timeout:100},{text:'Oturum Doğrulanıyor',progress:1000,timeout:1000}]"></Loader>
    </div>
    <div class="login-box">
      <img src="@/assets/ylogo.png" alt="social fx logo">
      <div class="login-content">
        <label>
          Kullanıcı Adı <br><span>{{erroru ? 'Hatalı kullanıcı adı' : '' }}</span><br>
          <input type="text" v-model="username">
        </label>
        <br>
        <label>
          Password<br><span>{{errorp ? 'Hatalı password' : '' }}</span>
          <br>
          <input type="password" v-model="pass">
        </label>
        <br>
        <button @click="loginHandler">
          Giriş
        </button>
        <br>
        <router-link to="/register"><b>Hemen Kayıt Ol.</b></router-link>
      </div>
    </div>
  </div>

</template>

<script>
import Loader from "@/components/Loader";
export default {
  name: "index",
  components: {Loader},
  data(){
    return{
      username:"",
      pass:'',
      loader:false,
      erroru:false,
      errorp:false,
    }
  },
  methods:{
    loginHandler(){
      this.loader= true;
      this.errorp = false;
      this.erroru = false;
      if(this.username !== "" || this.pass !== ""){
        if(this.username === 'alperensahin' && this.pass === 'alperen33'){
          setTimeout(()=>{
            this.$store.commit("setUser",this.username)
            this.$router.push("/home/app");
          },1500);
        }else if(this.username !== 'alperensahin'){
          setTimeout(()=>{
            this.loader = false;
            this.erroru= true;
          },300);
        }else{
          setTimeout(()=>{
            this.loader = false;
            this.errorp= true;
          },300);
        }
      }else{
        this.loader =false;
        this.errorp= true;
        this.erroru= true;
      }
    }
  }
}
</script>

<style scoped>

span{
  color: darkred;
  font-size: 15px;
}
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