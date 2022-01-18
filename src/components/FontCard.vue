<template>
  <section :id="id" class="font-card">
    <div class="header">
      <span class="title">{{ name }} {{ fontWeight }}</span>

      <span class="size">{{ fontFileSize }}</span>
      <div class="tooltip">현재 지정된 굵기를 나타내는 폰트의 용량입니다.</div>

      <ul class="dropdown">
        <li
          class="weight"
          v-for="(typeface, index) in typefaces"
          @click="weightClick"
          :key="index"
        >
          {{ typeface.weight
          }}<span class="ext">{{ ext(typeface.path).toUpperCase() }}</span>
        </li>
      </ul>
      <span class="icons">
        <a v-if="licenseURL" :href="licenseURL" target="_blank">
          <i class="material-icons">copyright</i>
        </a>
        <a :href="fontFilePath">
          <i class="material-icons">file_download</i>
        </a>
        <label>
          <input type="checkbox" />
          <i class="material-icons" @click="toggle(model)"
            >add_circle_outline</i
          >
        </label>
      </span>
    </div>
    <div
      :contenteditable="editable"
      class="editable"
      :class="editableClass"
      :style="editableStyle"
    >
      {{
        this.fontEnabled
          ? '&nbsp;고통이 고통이라는 이유로 그 자체를 사랑하고 소유하려는 자는 없다.'
          : ''
      }}
    </div>
  </section>
</template>

<script>
import inView from 'in-view'
import FontFaceObserver from 'fontfaceobserver'

const unit = 'px'
const initialSize = 25
const initialWeight = 400

const byte = 1
const kb = 1000 * byte
const mb = 1000 * kb
const bytesToMegaBytes = (bytes, digits) => {
  return parseInt((bytes / mb) * 10 ** digits, 10) / 10 ** digits + 'MB'
}

const timeout = 5 * 1000
const delay = 1 * 1000

export default {
  props: ['model', 'toggle'],

  data() {
    const model = this.model
    const typefaces = model.typefaces.sort((a, b) => {
      return a.weight - b.weight || b.path.localeCompare(a.path)
    })
    const slug = this.model.name.en.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    return {
      id: `font-card-${slug}`,
      slug,
      name: model.name.ko,
      licenseURL: model.license.url,
      typefaces,
      selectedFont:
        typefaces.find((typeface) => typeface.weight === 400) || typefaces[0],
      fontSize: initialSize,
      fontEnabled: false
    }
  },

  computed: {
    editable() {
      return this.fontEnabled
    },

    editableStyle() {
      return {
        fontSize: this.fontSize + unit,
        fontWeight: this.fontWeight
      }
    },

    editableClass() {
      const fontEnabled = this.fontEnabled
      return {
        [this.slug]: fontEnabled,
        loading: !fontEnabled
      }
    },

    fontWeight() {
      return this.selectedFont ? this.selectedFont.weight : initialWeight
    },

    fontFileSize() {
      const sizeBytes = this.selectedFont.size
      const significantDigitCount = 1
      return bytesToMegaBytes(sizeBytes, significantDigitCount)
    },

    fontFileFormat() {
      return this.selectedFont ? this.ext(this.selectedFont.path) : null
    },

    fontFilePath() {
      const font = this.selectedFont
      return font ? `static/fonts/${font.path}` : null
    }
  },

  methods: {
    ext(path) {
      return path.substring(path.lastIndexOf('.') + 1)
    },

    loadFont() {
      const enable = () => {
        this.fontEnabled = true
      }
      const retry = () => {
        const exception = {
          userAgent: window.navigator.userAgent,
          fontId: this.slug
        }
        window.ga(
          'send',
          'event',
          'error',
          'font-loading',
          JSON.stringify(exception)
        )
        this.loadFont()
      }

      const opts = {
        weight: this.fontWeight
      }
      new FontFaceObserver(this.model.name.en, opts)
        .load(null, timeout)
        .then(enable, retry)
    },

    reload(e) {
      this.fontEnabled = false
      setTimeout(this.loadFont, delay)
    },

    weightClick(e) {
      const target = e.target.classList.contains('ext')
        ? e.target.parentNode
        : e.target
      const text = target.textContent
      const weight = parseInt(text, 10)
      const format = text.replace(weight.toString(), '')
      this.selectedFont = this.typefaces.find((typeface) => {
        return (
          typeface.weight === weight &&
          typeface.path.toLowerCase().endsWith(format.toLowerCase())
        )
      })
      this.reload()
    },

    twoDigit(n) {
      return `${n < 10 ? '0' : ''}${n}`
    }
  },

  mounted() {
    const id = this.id
    inView(`#${id} .header`).once('enter', () => this.loadFont())
    inView(`#${id}`).on('enter', () =>
      window.ga('send', 'event', 'Interaction', 'view', `#${id}`)
    )
  }
}
</script>

<style>
.font-card {
  margin-top: 4rem;
  margin-left: 0rem;
  margin-right: 4rem;
  margin-bottom: 4rem;
  padding: 0 1rem;
  border-left: 1px solid;
  font-size: 1.2em;
  z-index: 0;
}

@media (max-width: 480px) {
  .font-card {
    margin-left: 4rem;
  }
}

@media (max-width: 810px) {
  .font-card {
    margin-left: 2rem;
    margin-right: 2rem;
  }
}

.font-card:first-child {
  margin-top: 8rem;
}

.font-card:last-child > *:last-child {
  margin-bottom: calc(100vh - 12rem);
}

.font-card .title::before {
  content: '▾';
}

.font-card .header {
  cursor: default;
  user-select: none;
}

.font-card .header .dropdown {
  position: absolute;
  box-shadow: 0.1rem 0.2rem 0.4rem lightgrey;
  z-index: 1;
  transform-origin: top;
  transition: opacity 0.1s 0.025s, transform 0.2s;
}

.font-card .header:not(:hover) .dropdown {
  opacity: 0;
  transform: scaleY(0);
}

.font-card .header:hover .dropdown .weight {
  cursor: pointer;
}

.font-card .header:hover .dropdown .weight .ext {
  background: #704fff;
  color: white;
  padding: 0.1rem 0.2rem;
  font-size: 50%;
  margin-left: 0.5em;
}

.font-card .header .dropdown > li {
  list-style-type: none;
  background: white;
  padding-top: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 0.5rem;
}

.font-card .header .dropdown > li:not(:first-of-type) {
  border-top: 1px solid lightgrey;
}

.font-card .header:not(:hover) .dropdown > li {
  transform: scale(0);
}

.font-card .header label.title {
  cursor: pointer;
  user-select: initial;
}

.font-card .size::before {
  content: ' ';
}

.font-card .header .size {
  opacity: 0.3;
  cursor: help;
}

.font-card .header .size:not(:hover) + .tooltip {
  display: none;
}

.font-card .header .size + .tooltip {
  position: absolute;
  width: 20rem;
  word-break: break-all;
  background: white;
  padding-top: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 0.5rem;
  box-shadow: 0rem 0.2rem 0.5rem lightgrey;
  z-index: 1;
}

.font-card .header .icons {
  float: right;
}

.font-card .header .icons > * {
  cursor: pointer;
}

.font-card .header .icons > *:not(:last-child) {
  margin-right: 0.25rem;
}

.font-card .header .icons > a {
  color: initial;
}

.font-card .header .icons > label > input {
  display: none;
}

.font-card .header .icons > label > input + i {
  transition: 0.3s;
}

.font-card .header .icons > label > input:checked + i {
  color: #ff01f3;
  /* `translate` === visual hack */
  transform: rotate(315deg) scale(1.05) translateX(-0.05rem) translateY(0.1rem);
}

.font-card .editable {
  width: 100%;
  margin-top: 0.5em;
  text-align: justify;
}

@media (max-width: 480px) {
  .font-card .header .icons {
    display: block;
    float: initial;
    margin-top: 0.5rem;
  }

  .font-card .editable {
    margin-top: 0;
  }
}

.font-card .editable::after {
  opacity: 0.5;
  user-select: none;
  font-weight: 400;
}

.font-card .editable.loading::after {
  content: '로딩 중';
  animation: dots steps(1, end) 1.8s infinite;
}

@keyframes dots {
  0% {
    content: '로딩 중.';
  }
  33% {
    content: '로딩 중..';
  }
  67% {
    content: '로딩 중...';
  }
  100% {
    content: '로딩 중.';
  }
}

.font-card .editable.failed::after {
  content: '폰트를 불러오는 중입니다. 이 상태가 유지될 경우 네트워크 상태 또는 브라우저 버전을 확인해 주세요.';
  color: #f75000;
  font-weight: 900;
}

.font-card .controls {
  width: 100%;
  display: flex;
  cursor: default;
}

.font-card .controls > span {
  cursor: pointer;
  user-select: none;
}

.font-card .controls > *:not(:last-child) {
  margin-right: 0.2em;
}

.font-card .controls > *:last-child {
  flex: 1;
  width: 100%;
}

.font-card .controls .indicator {
  margin-left: 5rem;
  margin-right: 1rem;
  cursor: default;
}

@media (max-width: 480px) {
  .font-card .controls .indicator {
    margin-left: 0;
    margin-right: 0;
  }
}

@media (min-width: 1080px) {
  .font-card .controls .indicator {
    margin-left: 30%;
  }
}

.font-card .controls input {
  cursor: pointer;
}
</style>
