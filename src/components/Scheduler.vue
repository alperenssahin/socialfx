<template>
  <div>
    <div v-if="loader">
        <Loader></Loader>
    </div>
    <diV class="release-box">
      <div>
        <div class="block" v-for="media in selectedSocialMedia" :key="media.size">
          <h2>{{media.title}}</h2>
          <div class="datepicker">
            <h3>Select Release Date</h3>
            <md-datepicker v-model="media.releaseDate" />
          </div>
          <br>
          <label>
            <h5>Select Release Time </h5><br>
            <input type="time">
          </label>
        </div>
      </diV>
      <button @click="releaseHandler">Release</button>
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
      selectedSocialMedia:Object.keys(this.$props.socialMedia).map(size=>{
        if(this.$props.socialMedia[size]){
          return {
            size : size,
            title : size === "16:10" ? 'Twitter' : size === "9:16" || size === "5:7" ? "Instagram" : size === "4:3" ? "Facebook" : '',
            releaseDate:null,
          }
        }else{
          return null;
        }
      }).filter(s=>s)
    }
  },props:{
    socialMedia:Object,setTimeout:Function
  },methods:{
    releaseHandler(){
      this.loader = true;
      this.$props.setTimeout()
    }
  }
}
</script>

<style scoped>
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
    width: 200px;
    justify-self: center;
  }
</style>