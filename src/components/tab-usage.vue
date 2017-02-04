<template>
  <div class="tab-usage">
    <ol>
      <li v-once v-for="step in steps" v-html="marked(step)"></li>
    </ol>
  </div>
</template>

<script>
import marked from 'marked'

const m = marked
export default {
  title: '사용법',
  props: ['meta'],
  methods: {
    marked () {
      return m.apply(m, arguments)
    }
  },
  computed: {
    steps () {
      return [
        `복사한 코드를 \`<head>\` 태그에 추가합니다.
        
\`\`\`html
<head>
  <style>
    /* 복사한 코드 */
    @font-face { /* ... */ }
    .글꼴-이름 { /* ... */ }
  </style>
</head>
\`\`\``,

        `복사한 코드에 있었던 CSS 클래스를 HTML 요소에 추가합니다.

\`\`\`html
<p class="글꼴-이름"></p>
\`\`\``,

        `유저 경험<span class="weak">UX</span>의 개선을 위해 [\`FontFaceObserver\`](https://github.com/bramstein/fontfaceobserver) 등을 적용합니다.

\`\`\`js
var FontFaceObserver = require('fontfaceobserver')

// 주의: 이때 '글꼴 이름'은 CSS에 있던 것이 아니라 
// font-family 속성에 있는 것을 사용해야 함
var observer = new FontFaceObserver('글꼴 이름')

observer.load().then(function () {
  console.log('시간 안에 로딩 완료')
}, function () {
  console.log('시간 안에 로딩하지 못함')
  // 주의: 한글 글꼴 파일은 용량이 크기 때문에
  // 이 경우에도 성공한 경우와 동일하게 처리함
})
\`\`\``,

        `더 읽기
* [웹 폰트 파헤치기](http://www.beautifulcss.com/archives/431)
* [(영어) 웹 폰트의 왕도](https://helloanselm.com/2015/using-webfonts-in-2015/)
* [(영어) 폰트 로딩 전략 안내서](https://www.zachleat.com/web/comprehensive-webfonts/)`
      ]
    }
  }
}
</script>

<style>
.tab-usage {
  font-size: 1.1em;
}

.tab-usage code {
  font-family: 'D2Coding', monospace;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  line-height: 1.4;
}

.tab-usage code, pre, blockquote {
  background: lightgrey;
}

.tab-usage pre, blockquote {
  margin: 0.2rem 0;
  padding: 0.5rem 1rem;
}

.tab-usage ol > li {
  margin: 2rem 1rem;
  line-height: 2.5;
}

.tab-usage ol > li:first-of-type {
  margin-top: 0;
}

.tab-usage ol > li:last-of-type {
  margin-bottom: 0;
}

.tab-usage ol ul {
  margin: 0 2rem;
}

.tab-usage ol ul > li {
  margin: 0.5rem 0;
}

.tab-usage a {
  text-decoration: none;
  border-bottom: 1px dotted #BE3DFF;
  padding-bottom: 1px;
}

.tab-usage .weak {
  opacity: 0.3;
}
</style>