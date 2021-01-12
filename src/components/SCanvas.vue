<template>
  <div class="s-canvas-box">
    <LoaderExclusive v-if="process" text="in progress" :progress="progress"></LoaderExclusive>
    <div :style="{display:'none'}">{{ imgData }}</div>
    <canvas :id="id"
            :style="{height:`${height}px`, width:`${height*size.split(':')[0]/size.split(':')[1]}px`}"></canvas>
    <button v-if="download" @click="downloadImage"> <md-icon>download</md-icon> Download Image</button>
  </div>
</template>

<script>
import {v4 as uuid} from "uuid";
import * as Color from "color";
import LoaderExclusive from "@/components/LoaderExclusive";

export default {
  name: "SCanvas",
  components: {LoaderExclusive,},
  props: {imgData: String, size: String,text:Object,imageSetter:Function},
  data() {
    return {
      download:false,
      process :false,
      progress:0,
      height: 500,
      width: 500 * this.$props.size.split(':')[0] / this.$props.size.split(':')[1],
      id: null,
      canvas: null,
      ctx: null,
      imageData: null,
      ratio: [Number(this.$props.size.split(':')[0]), Number(this.$props.size.split(':')[1])],
    }
  },
  updated() {
    if(this.img.src !== this.$props.imgData){
      this.img.src = this.$props.imgData;
      this.process = !!this.$props.imgData;
      this.$store.commit("setImage",this.$props.imgData);
    }
  },
  created() {
    this.id = uuid();
    if(this.img && this.$store.state.img){
      this.img.src = this.$store.state.img;
    }else{
      setTimeout(()=>{
        this.img.src = this.$store.state.img;
        this.process = true;
      },1000);
    }
  },
  mounted() {
    this.img = new Image;
    this.img.src = null;
    this.img.onload = () => {
      this.canvas.width = this.img.width;
      this.canvas.height = this.img.height;
      this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
      let gPoint = this.lightPicker();
      let g = this.gPoint(gPoint);
      let image = this.framer(g);
      this.canvas.height = image.height;
      this.canvas.width = image.width;
      this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
      this.ctx.putImageData(image.data,0,0);
      let text = this.$props.text;
      let title = text.title;
      let subtitle = text.subtitle;
      let info = text.info;
      console.log(gPoint.color);
      this.ctx.fillStyle = gPoint.color.isLight() ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"
      this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
      this.ctx.fillStyle = gPoint.color.isLight() ? '#000' : "#fff"
      this.ctx.font = `bold ${this.canvas.width/5}px Helvetica`
      this.ctx.fillText(title, 20,this.canvas.height/4,this.canvas.width-40);
      this.ctx.font = `${this.canvas.width/8}px Helvetica`
      this.ctx.fillText(subtitle, 20,this.canvas.height/2,this.canvas.width-40);
      this.ctx.font = `${this.canvas.width/10}px Helvetica`
      this.ctx.fillText(info, 20,this.canvas.height/1.5,this.canvas.width-40);
      this.process = false;
      this.download = true;
      this.$props.imageSetter(this.$props.size,document.getElementById(this.id).toDataURL());
    };
    this.canvas = document.getElementById(`${this.id}`);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.height = this.height;
    this.canvas.width = this.width;
  }, methods: {
    downloadImage(){
      let link = document.createElement('a');
      link.download = `${new Date().getTime()}.png`;
      link.href = document.getElementById(this.id).toDataURL();
      link.click();
    },
    framer(gPoint) {
        let maxH = this.canvas.height;
        let maxW = maxH/this.ratio[1]*this.ratio[0];
        let x,y;
        let dy = (gPoint.high[1].g - gPoint.low[1].g)/2
        let dx = (gPoint.high[0].g - gPoint.low[0].g)/2
        if(maxW > this.canvas.width){
          maxW = this.canvas.width;
          maxH = maxW / this.ratio[0]*this.ratio[1];
          y= gPoint.high[1].g - dy - maxH/2;
          x = 0;
          if(y<0) y =0;
        }else{
          y=0;
          x = gPoint.high[0].g - dx - maxW/2;
          if(x<0) x = 0;
        }
        return {
          data:this.ctx.getImageData(x,y,maxW,maxH),
          width: maxW,
          height: maxH,
        }
    },
    gPoint(points) {
      function histogram(s, obj) {
        if (obj[s]) {
          obj[s]++
        } else {
          obj[s] = 1;
        }
      }

      function gp(obj) {
        let g = {g: 0, p: 0};
        Object.keys(obj).forEach((a) => {
          let pt = g.p + obj[a];
          let dif = Math.abs(Number(a) - g.g);
          if (g.g > Number(a)) {
            dif = -1 * dif / pt * obj[a];
          } else {
            dif = dif / pt * obj[a]
          }
          g.g += dif;
          g.p = pt;
        })
        return g;

      }

      let hx = {};
      let hy = {};
      points.high.forEach(s => {
        histogram(s[0], hx);
        histogram(s[1], hy);
      });
      let lx = {};
      let ly = {};
      points.low.forEach(s => {
        histogram(s[0], lx);
        histogram(s[1], ly);
      });
      return {high: [gp(hx), gp(hy)], low: [gp(lx), gp(ly)]}
    },
    cropBottomRight() {
      let state = true;
      let first = null;
      for (let y = this.canvas.height - 1; y >= 0; y--) {
        for (let x = this.canvas.width - 1; x >= 0; x--) {
          let p = this.ctx.getImageData(x, y, 1, 1).data;
          if (state) {
            first = p[0];
            state = false;
            continue;
          }
          if (first !== p[0]) {
            return [x, y];
          }
        }
      }
      return [this.canvas.width, this.canvas.height]
    },
    cropTopLeft() {
      let state = true;
      let first = null;
      for (let x = 0; x < this.canvas.width; x++) {
        for (let y = 0; y < this.canvas.height; y++) {
          let p = this.ctx.getImageData(x, y, 1, 1).data;
          if (state) {
            first = p[0];
            state = false;
            continue;
          }
          if (first !== p[0]) {
            return [x, y];
          }
        }
      }
      return [0, 0];
    },
    lightPicker() {
      let size = 1;
      let high = [];
      let low = [];
      let r =0,g=0,b = 0;
      for (let x = 0; x < this.canvas.width; x++) {
        for (let y = 0; y < this.canvas.height; y++) {
          let p = this.ctx.getImageData(x, y, size, size).data;
          let c = new Color.rgb(p[0], p[1], p[2]);
          let hsl = c.hsl().object();
          let rgb = c.rgb().object();
          r += rgb.r;
          g += rgb.g;
          b += rgb.b;
          let sat = hsl.s > 50;
          let lum = hsl.l > 50;
          let val = sat && lum ? 255 : 0;
          // this.ctx.fillStyle = new Color.rgb(val, val, val).string();
          // this.ctx.fillRect(x, y, size, size)
          val === 255 ? high.push([x, y]) : low.push([x, y]);
        }
      }
      r = r/(this.canvas.width*this.canvas.height);
      g = g/(this.canvas.width*this.canvas.height);
      b = b/(this.canvas.width*this.canvas.height);
      return {
        high: high,
        low: low,
        color: new Color.rgb(r,g,b),
      }
    }
  }
}
</script>

<style scoped>

</style>