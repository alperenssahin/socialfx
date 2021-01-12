<template>
  <div class="box">
    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    <h2>{{text}}</h2>
    <div class="stick">
      <div class="progress" :style="{width:progress+'%'}"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoaderExclusive",props:{text:String,progress:Number},
  data(){
    return{
      current:1,
    }
  },
  methods:{

  },
  mounted() {

  }
}
</script>

<style scoped>

.stick{
  width: 100vw;
  transition: 1s;
}
.progress{
  width: 0%;
  height: 30px;
  margin-top: 10px;
  background-color: var(--purple);
  transition: 1s;
}
img{
  width: 500px;
  opacity: 0.7;
}
  .box{
    top:0;
    left: 0;
    width: 100vw;
    height: 100vh;
    position: fixed;
    background-color: rgba(255, 198, 24,0.7);
    display: grid;
    align-content: center;
    justify-content: center;
    justify-items: center;
    color: var(--purple);
  }

  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: var(--purple);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }

</style>