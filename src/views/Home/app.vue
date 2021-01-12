<template>
  <div class="app-box">
    <div v-if="process && $store.state.leastPost > 0">
      <div class="title" v-if="state === 0">Select social media</div>
      <div style="text-align: center" v-if="state === 0">Bu ay <b> {{ $store.state.leastPost }}</b> tane daha gönderi
        oluşturabilirsiniz.
      </div>
      <div v-if="state === 0" class="choice-social-media">
        <social-media-picker size="5:7" title="Instagram Post" :model="socialMediaHandler"
                             photo="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/264px-Instagram_logo_2016.svg.png"></social-media-picker>
        <social-media-picker size="9:16" title="Instagram Story" :model="socialMediaHandler"
                             photo="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/264px-Instagram_logo_2016.svg.png"></social-media-picker>
        <social-media-picker size="16:10" title="Twitter Post" :model="socialMediaHandler"
                             photo="https://logos-world.net/wp-content/uploads/2020/04/Twitter-Logo.png"></social-media-picker>
        <social-media-picker size="4:3" title="Facebook Post" :model="socialMediaHandler"
                             photo="https://i.pinimg.com/originals/30/99/af/3099aff4115ee20f43e3cdad04f59c48.png"></social-media-picker>
      </div>
      <button v-if="state === 0" class="next" @click="socialMediaSelectedHandler() ? state++:''">Next</button>
      <div class="title" v-if="state === 1">Fill inputs</div>
      <div class="input-fill" v-if="state === 1">
        <div class="post-inputs">

          <label>
            Title
            <br><input type="text" placeholder="Happy New Year Party" v-model="title">
            <br><br>
          </label>
          <label>
            Subtitle
            <br><input type="text" placeholder="01.01.2021 | BESIKTAS" v-model="subtitle">
            <br><br>
          </label>
          <label>
            Info
            <br><textarea cols="53" rows="10" placeholder="Ticket : 30₺ | Saat:23.00" v-model="info"></textarea>
            <br><br>
          </label>
          <label>
            <!--              Background-->
            <!--              <br><input type="file">-->
            <!--              <br> -->
            Background <br>
            <input type="file" @change="imageLoadHandler">
            <br><br>
          </label>

          <button @click="state++">Next</button>
        </div>
        <div class="posts">
          <Generator :title="title"
                     :subtitle="subtitle"
                     :background="background"
                     :info="info"
                     :text-color="textColor"
                     :size-array="socialMedia"
                     :overlay-color="overlayColor"
                     :imageSetter="imageSetter"
                     :height="500"></Generator>
        </div>
      </div>
      <div class="scheduler" v-if="state === 2">
        <Scheduler :social-media="socialMedia" :set-timeout="setTimeOut"></Scheduler>
      </div>
    </div>
    <div v-else>
      <div class="new-post" @click="process = true">
        <div class="new-post-text" v-if=" $store.state.leastPost > 0">
          <sup>+</sup> New Post
        </div>
        <div class="new-post-text" v-else>
          Aylık kullanım hakkınız doldu
        </div>
      </div>


    </div>
    <router-link v-if="state < 1" class="s-link" to="/home/dashboard">Gönderimlerinizi Yönetin</router-link>
    <router-link v-if="state < 1" class="s-link" to="/register">Hemen Yükseltin</router-link>
  </div>
</template>

<script>
import SocialMediaPicker from "@/components/SocialMediaPicker";
import Generator from "@/components/Generator";
import Scheduler from "@/components/Scheduler";

export default {
  name: "app",
  components: {Scheduler, Generator, SocialMediaPicker},
  data: function () {
    return {
      process: false,
      state: 0,
      title: "xMasParty",
      subtitle: "31.12.2020 | Saat : 23.00",
      info: "BESIKTAS",
      textColor: "#000",
      overlayColor: "rgba(255,255,255,0.5)",
      background: null,
      socialMedia: {
        "16:10": true,
        "9:16": true,
        "4:3": false,
        "5:7": false
      },
    }
  }, methods: {
    setTimeOut() {
      setTimeout(() => {
        this.process = false;
        this.state = 0;
        this.socialMedia = {
          "16:10": false,
          "9:16": false,
          "4:3": false,
          "5:7": false
        }
      }, 5000);
    },
    imageSetter(size,imageURI){
      this.socialMedia[size] = imageURI
    },
    imageLoadHandler(ev) {
      let img = new Image;
      let canvas = document.createElement("canvas");
      let size = 50;
      canvas.width = size;
      canvas.height = size;
      let ctx = canvas.getContext("2d");

      this.background = URL.createObjectURL(ev.target.files[0]);
      img.src = URL.createObjectURL(ev.target.files[0]);
    },
    rgbToHex(r, g, b) {
      if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
      return ((r << 16) | (g << 8) | b).toString(16);
    }, getColorContrast(hex) {
      let rgb = this.hexToRgb(hex);
      let nrgb = {r: 255 - rgb.r, g: 255 - rgb.g, b: 255 - rgb.b};
      return this.rgbToHex(nrgb.r, nrgb.g, nrgb.b);
    },
    socialMediaSelectedHandler() {
      let state = false;
      Object.keys(this.socialMedia).forEach(key => {
        state = state || this.socialMedia[key];
      })
      return state;
    },
    hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    },
    socialMediaHandler(val, size) {
      this.socialMedia[size] = val;
    }
  }
}
</script>

<style scoped>
.s-link {
  font-size: 20px !important;
  text-align: center !important;
  width: 100%;
  margin-top: 20px !important;
}

.title {
  text-align: center;
}

.app-box {
  display: grid;
  align-content: center;
  justify-items: center;
  min-height: 90vh;
}

.new-post-text {
  font-size: 30px;
  color: white;
}

.new-post {
  padding: 30px;
  background-color: var(--pink);
  width: fit-content;
  border-radius: 10px;
  border: 5px dashed var(--purple);
  cursor: pointer;
}

.next {
  margin-top: 30px;
}

.new-post:hover {
  background-color: var(--purple);
}

.choice-social-media {
  display: grid;
  grid-gap: 10px;
  grid-template-columns:  auto auto auto auto;
}

.post-inputs {
  border-right: 4px solid var(--yellow);
  padding: 20px;
}

label {
  font-weight: bold;
  color: #823AD9;
}

input[type='text'] {
  border-bottom: 2px solid var(--pink);
  width: 100%;
}

input[type='text']:hover, input[type='text']:focus {
  border-bottom: 2px solid var(--purple);
  width: 100%;
}

.post-inputs label {
  padding-top: 30px !important;
  margin-bottom: 30px;

}

.input-fill {
  display: grid;
  grid-template-columns: 1fr 2fr;
}
</style>