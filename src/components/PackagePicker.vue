<template>
  <div class="package-box">
    <h2>{{title}}</h2>

    <h3>Post Sayısı</h3>
    <h4>{{postNumber}}</h4>

    <h3>Sosyal Medya Platformları</h3>
    <h4>{{socialMedia}}</h4>

    <h3>Takvim Özelliği</h3>
    <md-icon :class="{negative:!calendar}">{{calendar ? 'check_circle' : 'cancel'}}</md-icon>
    <h3>Özel Günler Bülteni</h3>
    <md-icon :class="{negative:!spacialDays}">{{spacialDays ? 'check_circle' : 'cancel'}}</md-icon>
    <h3>Trend Topic Bülteni</h3>
    <md-icon :class="{negative:!trendTopics}">{{trendTopics ? 'check_circle' : 'cancel'}}</md-icon>
    <h3>Golden Hour Bülteni</h3>
    <md-icon :class="{negative:!goldenHour}">{{goldenHour ? 'check_circle' : 'cancel'}}</md-icon>
    <br>
    <button>{{price}}</button>
  </div>
</template>

<script>
export default {
  name: "PackagePicker",props:{title:String,price:String,postNumber:String,socialMedia:String,calendar:Boolean,spacialDays:Boolean,trendTopics:Boolean,goldenHour:Boolean}
}
</script>

<style scoped>
  .package-box{
    border: 2px solid var(--purple);
    border-radius: 40px;
  }
  .package-box:hover{
    cursor: pointer;
    background-color: rgba(0,200,255,0.5);
  }
  h2{
    font-size: 40px;
    color: var(--purple);
    margin-bottom: 40px;

  }
  h3{
    font-size: 23px;
    background-color: white;
    opacity: 0.8;
    padding: 4px;
  }
  h4{
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .md-icon{
    color: green !important;
  }
  .md-icon.negative{
    color: darkred !important;
  }
  button{
    width: 80%;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 20px;
  }
</style>