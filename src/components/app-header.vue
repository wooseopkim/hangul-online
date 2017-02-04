<template>
  <header class="masthead">
    <h1>한글<br>온라인</h1>
    <p>세상의 모든 한글 글꼴</p>
    <p id="copyright">(C) Wooseop Kim {{ period }}</p>
  </header>
</template>

<script>
const start = 2017
const now = new Date().getFullYear()
const period = `${start}${start >= now ? '' : `-${now}`}`

export default {
  data () {
    return {period}
  }
}
</script>

<style>
.masthead {
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  margin-top: 4rem;
  cursor: default;
  user-select: none;
}

@media (max-width: 480px) {
  .masthead {
    position: relative;
    width: 100%;
    height: initial;
  }
}

.masthead > * {
  margin-left: 20%;
  margin-right: 20%;
}

.masthead > h1 {
  margin-top: 20%;
  margin-bottom: 0;
  font-size: 3rem;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-name: glitter;
}

@keyframes glitter {
  0% {
    color: #30226D;
  }

  10% {
    color: #30226D;
  }
  
  80% {
    color: #704FFF;
  }

  100% {
    color: #704FFF;
  }
}

.masthead > p {
  margin-top: 10%;
  margin-bottom: 10%; 
  font-size: 1rem;
}

.masthead > p:last-child {
  margin-top: 10%;
  margin-bottom: 40%;
  display: flex;
  flex: 1;
  align-items: flex-end;
}

@media (max-width: 480px) {
  .masthead > p, .masthead > p:last-child {
    margin-bottom: 0;
  }
}
</style>