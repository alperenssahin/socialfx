<template>
<div>
  <div class="box">
    <div class="posts">
      <div class="postElement" v-for="(item,index) in $store.state.posts" :key="index">
        <img :src="item.imgData">
        <div>
          <div class="meta"><strong>Platform</strong> : {{item.title}} <br> <strong>Size</strong> : {{item.size}}</div>
          <div class="time">{{item.releaseDate}} | {{item.releaseTime}}</div>
        </div>
      </div>
    </div>
    <div class="data">
      <h1>Bildirimler</h1>
      <br>
      <h2>Alarmlar</h2>
      Bu ay <b> {{ $store.state.leastPost }}</b> tane daha gönderi
      oluşturabilirsiniz.
      <br> <br> <br><h2>Geçmiş</h2>
      <b>19.12.2020 </b> tarihli twitter postu başarıyla paylaşıldı

      <br>
      <b>01.12.2020 </b> tarihli twitter postu başarıyla paylaşıldı

      <br>
      <b>29.09.2020 </b> tarihli twitter postu başarıyla paylaşıldı

    </div>
  </div>
</div>
</template>

<script>
import SCanvas from "@/components/SCanvas";
export default {
  name: "dashboard",
  components: {SCanvas}
}
</script>

<style scoped>
  .box{
    display: grid;
    grid-template-columns: 2fr 1fr;
    padding: 20px;
  }
  .postElement{
    line-height: normal;
    display: grid;
    grid-template-columns: 1fr 2fr ;
    grid-gap: 20px;
    margin-bottom: 30px;
    padding: 20px;
    border: 2px solid var(--purple);
    border-radius: 30px;
    color: var(--purple);
  }
  h1,h2{
    color: var(--purple);
  }
  .meta{
    font-size: 30px !important;
    margin-bottom: 30px;
  }
  .time{
    font-size: 20px;
    margin-bottom: 20px;
  }
  .data{
    justify-self: center;
  }
  img{
    max-width: 300px;
  }
</style>