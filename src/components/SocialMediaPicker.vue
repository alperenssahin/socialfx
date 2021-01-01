<template>
    <div class="picker-box" @click="value = !value" :class="{selected:value}">
      <img :src="photo">
      <div>{{title}}</div>
      <div class="size-canvas" :class="{
        nineSixteen:size==='9:16',
         sixteenTen:size==='16:10',
          sevenFive:size==='5:7',
           fourThree:size==='4:3',
      }"></div>
      <div class="size" >{{size}}</div>
      <input type="checkbox" v-model="value">
    </div>
</template>

<script>
export default {
  name: "SocialMediaPicker",props:{photo:String,size:String,model:Function,title:String}
  ,data:function (){
    return{
      value:false
    }
  },watch:{
    value(val){
      this.$props.model(val,this.$props.size);
    }
  }
}
</script>

<style scoped>
.selected{
  background-color: var(--pink);
}
.picker-box{
  border-radius: 10px;
  min-width: 100px;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  align-content: center;
  align-items: center;
  justify-items: center;
  color: var(--purple);
  cursor: pointer;
}
.picker-box:hover{
  background-color: var(--pink);
}
.size-canvas{
  background-color: var(--gray);
  height: 50px;
  margin: 10px;
}

  img{

    height: 50px;
    margin-bottom: 10px;
  }
  input{
    margin-top: 10px;
    opacity: 0;
  }
</style>