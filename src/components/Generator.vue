<template>
  <div class="generator-box">
    <div class="scanvas"
         v-for="size in Object.keys(sizeArray).filter(key=>sizeArray[key])">
      <div class="background-layer" v-if="size === selectedSize"
           :style="{
        backgroundImage:`url('${background}')`,
        color:textColor,}">
        <div class="selement" :class="{
        nineSixteen:size==='9:16',
         sixteenTen:size==='16:10',
          sevenFive:size==='5:7',
           fourThree:size==='4:3',}"
          :style="{ height:`${height}px`,
        color:textColor,
        backgroundColor:overlayColor,
        width:`${height*size.split(':')[0]/size.split(':')[1]}px`}"
        >
          <div class="stitle">{{title}}</div>
          <div class="ssubtitle">
            <div v-for="item in subtitle.split('|')" :key="item">
              {{item}}
            </div>
          </div>
          <div class="sinfo" >
            <div v-for="item in  info.split('|')" :key="item">{{item}}</div>
          </div>
           </div>
      </div>
    </div>
    <div  class="select-size">
      <div v-for="size in Object.keys(sizeArray).filter(key=>sizeArray[key])">
        <div>
          <label>
            <input type="radio" :value="size" v-model="selectedSize">
            {{size}}
          </label></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Generator",props:{title:String,background:String,subtitle:String,info:String,sizeArray:Object,
    height:Number,
    textColor:{type:String,default:"#000"},
    overlayColor:{type:String,default:"#000"}},
  data(){
    return{
      selectedSize:Object.keys(this.$props.sizeArray).filter(s=>this.$props.sizeArray[s])[0],
    }
  },
  methods:{

  }
}
</script>

<style scoped>
  .generator-box{
    padding: 20px;
  }
  .select-size{
    display: grid;
    justify-content:center;
    grid-gap: 20px;
    grid-template-columns: auto auto auto auto auto;
    margin-top: 20px;
  }
  .scanvas{
    display: grid;
  }
  .background-layer{
    background-repeat: no-repeat;
    background-size: cover;
    width: fit-content;
    justify-content: center;
    display: grid;
    justify-items: center;
    justify-self: center;
  }
  .selement{

    justify-self: center;
    display: grid;
  }

  img{
    width: 20px;
    height: 20px;
  }
  .sixteenTen{
    font-size: 30px;
    padding: 30px;
  }
  .sixteenTen .stitle{
    align-self: center;
  }
  .sixteenTen .ssubtitle{
    align-self: end;
  }
  .nineSixteen{
    font-size: 17px;
    padding: 10px;
    align-content: center;
    justify-content: center;
    text-align: center;
    grid-gap: 2em;
  }
  .nineSixteen .sinfo{
    font-size: 1.5em;
  }
  .nineSixteen .ssubtitle{
    font-size: 2.2em;
  }
  .sevenFive{
    align-content: end;
    justify-content: end;
    text-align: end;
  }

  .fourThree{
    font-size: 20px;
    padding: 30px;
    text-align: center;
  }

  .fourThree .stitle{
    align-self: center;
    justify-self: center;
  }
  .fourThree .ssubtitle{
    align-self: end;
    justify-self: center;
  }
  .fourThree .sinfo{
    justify-self: center;
  }

  .sevenFive{
    font-size: 15px;
    padding: 30px;
  }
  .sevenFive .stitle{
    align-self: end;
    justify-self: end;
  }
  .sevenFive .ssubtitle{
    align-self: end;
    justify-self: end;
  }
  .sevenFive .sinfo{
    justify-self: end;
  }

  .stitle{
    font-size: 3em;
    font-weight: bold;
  }
  .ssubtitle{
    font-size: 2em;
  }
  .sinfo{
    font-size: 1em;
  }
</style>