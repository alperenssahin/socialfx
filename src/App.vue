<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
:root {
  --yellow: #ffc618;
  --pink:#EF8EBC;
  --purple:#823AD9;
  --pink-dark: #c4749a;
  --gray:#ddd;

}
*{
  box-sizing: 0;
  margin: 0;
}

body{
  font-family: Helvetica;
}

.title{
  font-size: 40px;
  margin-top: 15px;
  margin-bottom: 15px;
  font-weight: bolder;
  color: var(--purple);
}

label,input,button{
  font-size: 24px;
  margin-bottom: 10px;
}
button{
  width: 100%;
  background-color: var(--pink);
  outline: none;
  border: none;
  color: white;
  padding: 4px;
  cursor: pointer;
}
button:hover{
  background-color: var(--pink-dark);
}
button:active{
  background-color: var(--pink);
}
input{
  background-color: rgba(0,0,0,0);
  outline: none;
  border: none;
  border-bottom: 2px solid white;
}
input:focus{
  border-bottom: 2px solid var(--purple);
}

.nineSixteen{
  width: calc(50px * 9/16);
}
.sixteenTen{
  width: calc(50px * 16/10);
}

.fourThree{
  width: calc(50px * 4/3);
}

.sevenFive{
  width: calc(50px * 5/7);
}
</style>
