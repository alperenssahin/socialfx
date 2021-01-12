<template>
  <div>
    <div v-if="loader">
        <Loader :progress-array="[{text:'Images are saving',progress:25,timeout:600},{text:'Trigger created',progress:70,timeout:1200},
        {text:'Meta data saved',progress:90,timeout:1200},{text:'DONE',progress:100,timeout:1000}]"></Loader>
    </div>
    <diV class="release-box">
      <div>
        <div class="block" v-for="media in selectedSocialMedia" :key="media.size">
          <h2>{{media.title}}</h2>
          <div class="datepicker">
            <h3>Paylaşma Tarihi Seçin</h3>
            <md-datepicker v-model="media.releaseDate" />
          </div>
          <br>
          <label>
            <h5> Paylaşma Saati Seçin </h5><br>
            <input type="time" v-model="media.releaseTime">
          </label>
          <div class="preview">
            <img :src="socialMedia[media.size]">
          </div>
        </div>
      </diV>
      <div class="right-cenah">
        <div class="datepicker">
          <h3> Bütün Postlar İçin Paylaşma Tarihi Seçin</h3>
          <md-datepicker v-model="generalDate" />
        </div>
        <br>
        <label>
          <h5> Bütün Postlar İçin Paylaşma Saati Seçin </h5><br>
          <input type="time" v-model="generalTime">
        </label>
        <br>
        <button class="release" @click="releaseHandler">Release</button>
      </div>
      </div>
  </div>

</template>

<script>
import Loader from "@/components/Loader";
export default {
  name: "Scheduler",
  components: {Loader},
  data(){
    return{
      loader:false,
      generalTime:"",
      generalDate:"",
      selectedSocialMedia:Object.keys(this.$props.socialMedia).map(size=>{
        if(this.$props.socialMedia[size]){
          return {
            size : size,
            title : size === "16:10" ? 'Twitter' : size === "9:16" || size === "5:7" ? "Instagram" : size === "4:3" ? "Facebook" : '',
            releaseDate:null,
            releaseTime:null,
            imgData:this.$props.socialMedia[size],
          }
        }else{
          return null;
        }
      }).filter(s=>s)
    }
  },props:{
    socialMedia:Object,setTimeout:Function
  },
  watch:{
    generalTime(val){
      for(let s of this.selectedSocialMedia){
        s.releaseTime = val;
      }
    },
    generalDate(val){
      for(let s of this.selectedSocialMedia){
        s.releaseDate = val;
      }
    }
  },
  methods:{
    releaseHandler(){
      this.loader = true;
      for(let post of this.selectedSocialMedia){
        this.$store.commit("pushPost",post)
      }
      this.$props.setTimeout()
    }
  }
}
</script>

<style scoped>
  .right-cenah{
    justify-self: center;
    align-self: start;
  }
  h2,h3,h5{
    color: var(--purple);
  }
  .datepicker{
    display: grid;
    grid-gap: 20px;
    grid-template-columns: auto;
  }
  .block{
    cursor: pointer;
    border: 2px solid var(--pink);
    margin: 10px;
    border-radius: 20px;
    padding: 20px;
  }
  .block:hover{
    background-color: var(--pink);
  }
  .release-box{
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
  button{
    height: 60px;
    align-self: center;
    border-radius: 20px;
    justify-self: center;
  }
  img{
    max-width: 200px;
  }
</style>