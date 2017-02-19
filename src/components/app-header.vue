<template>
  <header class="masthead">
    <h1>한글<br>온라인</h1>
    <p>너와 나의 한글 글꼴</p>
    <ul class="social-buttons">
      <li
        v-for="socialButton in socialButtons"
        class="social-button"
        :style="{backgroundColor: socialButton.background}"
      >
        <a
          :id="'social-button_' + socialButton.name.toLowerCase()"
          class="symbol"
          target="_blank"
          :href="socialButton.url + location"
          :style="{color: socialButton.color}">{{
          socialButton.symbol 
        }}</a>
      </li>
    </ul>
    <p id="copyright">(C) <a href="https://blog.wooseop.kim/">Wooseop Kim</a> {{ period }}</p>
  </header>
</template>

<script>
const start = 2017
const now = new Date().getFullYear()
const period = `${start}${start >= now ? '' : `-${now}`}`

export default {
  data () {
    return {
      period,
      location: window.location.href,
      socialButtons: [
        {
          name: 'Facebook',
          symbol: 'fb',
          color: 'white',
          background: 'darkblue',
          url: 'https://www.facebook.com/sharer/sharer.php?u='
        },
        {
          name: 'Kakao',
          symbol: 'ka',
          color: 'saddlebrown',
          background: 'gold',
          url: 'https://story.kakao.com/share?url='
        },
        {
          name: 'Twitter',
          symbol: 'tw',
          color: 'white',
          background: 'dodgerblue',
          url: 'https://twitter.com/intent/tweet?text=&url='
        },
        {
          name: 'Naver',
          symbol: 'Nv',
          color: 'white',
          background: 'limegreen',
          url: 'http://blog.naver.com/openapi/share?url='
        },
        {
          name: 'Google',
          symbol: 'gl',
          color: 'white',
          background: 'crimson',
          url: 'https://plus.google.com/share?url='
        }
      ]
    }
  },
  mounted () {
    if (!/Android|iP([ao]d|hone)|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return
    const kakaoButton = document.getElementById('social-button_kakao')
    console.log('setting up kakao link...')
    kakaoButton.href = '#'
    kakaoButton.target = ''
    const Kakao = window.Kakao
    Kakao.init('7c918b037e323f2d978a23d0d48488a5')
    Kakao.Link.createTalkLinkButton({
      container: kakaoButton,
      label: document.title,
      image: {
        src: document.querySelector('meta[property="og:image"]').content,
        width: 300,
        height: 300
      },
      webButton: {
        text: '열기',
        url: window.location.href
      }
    })
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

@media (max-width: 810px) {
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

@media (max-width: 810px) {
  .masthead > p {
    margin-bottom: 5%;
  }

  .masthead > p:last-child {
    margin-bottom: 5%;
  }
}

@media (max-width: 480px) {
  .masthead > p:last-child {
    margin-bottom: 0;
  }
}

.masthead .social-buttons > .social-button {
  display: inline-block;
  min-width: 2rem;
  height: 2rem;
  font-weight: lighter;
  cursor: pointer;
  transition: 1s;
}

.masthead .social-buttons > .social-button:hover {
  filter: brightness(135%) saturate(150%);
}

.masthead .social-button > .symbol {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding-right: 0.2rem;
  text-decoration: none;
  border-bottom: none;
}

.masthead #copyright {
  white-space: pre;
}

.masthead a {
  text-decoration: none;
  color: initial;
  border-bottom: 1px dotted;
}
</style>