<template>
  <div class="box">
    <div class="title">
      <h1>{{ isSelected ? 'Kayıt olun':'Üyeliğinizi Seçin' }}</h1>
      <div class="packages" :class="{selected:isSelected}">
        <div @click="isSelected = true;pure=true;" v-if="!isSelected ||pure">
          <package-picker v-if="!isSelected || pure"
                          title="PURE"
                          post-number="4"
                          social-media="Seçilen 2 platform"
                          :calendar="true"
                          :spacial-days="true"
                          :trend-topics="false"
                          :golden-hour="false"
                          price="9.99$"
          ></package-picker>
        </div>
        <div @click="isSelected = true;plus=true;" v-if="!isSelected ||plus">
          <package-picker  v-if="!isSelected || plus"
                           title="PLUS"
                           post-number="16"
                           social-media="Tümü"
                           :calendar="true"
                           :spacial-days="true"
                           :trend-topics="true"
                           :golden-hour="false"
                           price="29.99$"
          ></package-picker>
        </div>
        <div @click="isSelected = true;prime=true;" v-if="!isSelected || prime">
          <package-picker v-if="!isSelected || prime"
                          title="PRIME"
                          post-number="Sınırsız"
                          social-media="Tümü"
                          :calendar="true"
                          :spacial-days="true"
                          :trend-topics="true"
                          :golden-hour="true"
                          price="99.99$"
          ></package-picker>
        </div>
        <div v-if="isSelected">
          <label>
            Kullanıcı Adı <br>
            <input type="text" v-model="username">
          </label>
          <br>
          <label>
            Password
            <br>
            <input type="password">
          </label>
          <br>
          <button @click="loginHandler">
            Kaydol
          </button>
          <br>
          <router-link class="link" to="/"><b>Üye misin? Giriş yap.</b></router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import PackagePicker from "@/components/PackagePicker";
export default {
  name: "index",
  components: {PackagePicker}
  ,data(){
    return {
      isSelected:false,
      pure:false,
      plus:false,
      prime:false,
      username:""
    }
  },methods:{
    loginHandler(){
      this.$store.commit("setUser",this.username)
      this.$router.push("/home/app");
    }
  }
}
</script>

<style scoped>
button{
  width: 50%;
}
.link{
  font-size: 23px !important;
}
  .box{
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    align-content: center;
    justify-content: center;
    background-color: var(--yellow);
    padding: 200px;
  }
  .title{
    text-align: center;
  }
  .packages{
    line-height: normal;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 50px;
    grid-gap: 20px;
  }
  .packages.selected{
    grid-template-columns: 1fr 1fr;
  }
</style>