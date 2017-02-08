<template>
  <section :id="id" class="font-card">
    <!-- FIXME Clarity `dropdownActive` flow-->
    <!-- TODO Split into smaller components? -->
    <div class="header" @mouseleave="dropdownActive = false">
      <span
        class="title"
        @mouseenter="dropdownActive = true"
      >{{ name }} {{ fontWeight }}</span>
      <span class="size" @mouseenter="dropdownActive = false">{{ fontFileSize }}</span>
      <div class="tooltip">현재 지정된 굵기를 나타내는 폰트의 용량입니다.</div>
      <ul
        class="dropdown"
        :class="dropdownClass"
        @mouseleave="dropdownActive = false"
      >
        <li class="weight" v-for="type in types">{{ type.weight }}<span class="ext">{{ ext(type.path).toUpperCase() }}</span></li>
      </ul>
      <span class="icons">
        <a v-if="licenseURL" :href="licenseURL">
          <i class="material-icons">copyright</i>
        </a>
        <a :href="fontFilePath">
          <i class="material-icons">file_download</i>
        </a>
        <label>
          <input type="checkbox">
          <i class="material-icons" @click="toggle(model)">add_circle_outline</i>
        </label>
      </span>
    </div>
    <div class="controls">
      <span class="opacity" style="opacity: 1.0;">가</span>
      <span class="opacity" style="opacity: 0.7;">가</span>
      <span class="opacity" style="opacity: 0.3;">가</span>
      <span class="indicator">{{ (fontSize < 10 ? '0' : '') + fontSize }}px</span>
      <input type="range" min="12" max="48" :value="fontSize" @input="inputChange" disabled="!fontEnabled">
    </div>
    <div :contenteditable="editable" class="editable" :class="editableClass" :style="editableStyle" @click="reload">{{
      this.fontEnabled ? '&nbsp;고통이 고통이라는 이유로 그 자체를 사랑하고 소유하려는 자는 없다.' : ''
    }}</div>
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
const bytesToMegaBytes = (bytes, digits) => parseInt(bytes / mb * (10 ** digits), 10) / (10 ** digits) + 'MB'

const timeout = 10 * 1000

export default {
  props: ['model', 'toggle'],
  data () {
    const model = this.model
    const typefaces = model.typefaces.sort((a, b) => (a.weight - b.weight) || b.path.localeCompare(a.path))
    const slug = this.model.name.en.toLowerCase().replace(/\s+/g, '-')
    return {
      id: `font-card-${slug}`,
      slug,
      name: model.name.ko,
      licenseURL: model.license.url,
      types: typefaces,
      selectedFont: typefaces.find(typeface => typeface.weight === 400) || typefaces[0],
      fontSize: initialSize,
      fontEnabled: false,
      fontFailed: false,
      dropdownActive: false
    }
  },
  computed: {
    editable () {
      return this.fontEnabled && !this.fontFailed
    },
    editableStyle () {
      return {
        fontSize: this.fontSize + unit,
        fontWeight: this.fontWeight,
        cursor: this.fontFailed ? 'pointer' : 'initial'
      }
    },
    editableClass () {
      const fontEnabled = this.fontEnabled
      const fontFailed = this.fontFailed
      return {
        [this.slug]: fontEnabled,
        loading: !fontEnabled && !fontFailed,
        failed: fontFailed
      }
    },
    dropdownClass () {
      return {
        active: this.dropdownActive
      }
    },
    fontWeight () {
      return this.selectedFont ? this.selectedFont.weight : initialWeight
    },
    fontFileSize () {
      const sizeBytes = this.selectedFont.size
      const significantDigitCount = 1
      return bytesToMegaBytes(sizeBytes, significantDigitCount)
    },
    fontFileFormat () {
      return this.selectedFont ? this.ext(this.selectedFont.path) : null
    },
    fontFilePath () {
      const font = this.selectedFont
      return font ? `static/fonts/${font.path}` : null
    }
  },
  methods: {
    ext (path) {
      return path.substring(path.lastIndexOf('.') + 1)
    },
    inputChange (e) {
      this.fontSize = e.target.value
    },
    loadFont () {
      const enable = () => { this.fontEnabled = true }
      const fail = () => { this.fontFailed = true }
      const opts = { weight: this.fontWeight }
      new FontFaceObserver(this.model.name.en, opts).load(null, timeout).then(enable, fail)
    },
    reload (e) {
      if (!this.fontFailed) return
      this.loadFont()
    }
  },
  mounted () {
    const el = this.$el
    this.checkbox = el.getElementsByTagName('input')[0]
    this.dropdown = el.getElementsByTagName('ul')[0]
    const editable = el.getElementsByClassName('editable')[0]
    Array.prototype.forEach.call(el.getElementsByClassName('opacity'), x => {
      x.addEventListener('click', e => {
        const alpha = e.target.style.opacity
        editable.style.color = `rgba(0, 0, 0, ${alpha})`
      })
    })
    Array.prototype.forEach.call(el.getElementsByClassName('weight'), x => {
      x.addEventListener('click', e => {
        if (!this.dropdownActive) return
        const target = e.target.classList.contains('ext') ? e.target.parentNode : e.target
        const text = target.textContent
        const weight = parseInt(text, 10)
        const format = text.replace(weight.toString(), '')
        this.selectedFont = this.types.find(typeface => {
          return typeface.weight === weight &&
              typeface.path.toLowerCase().endsWith(format.toLowerCase())
        })
      })
    })
    inView(`#${this.id} .editable`).once('enter', () => this.loadFont())
  }
}
</script>

<style>
.font-card {
  margin-top: 2rem;
  margin-left: 0rem;
  margin-right: 4rem;
  margin-bottom: 2rem;
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
  margin-top: 4rem;
}

.font-card:last-child {
  margin-bottom: 4rem;
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

.font-card .header .dropdown:not(.active) {
  opacity: 0;
  transform: scaleY(0);
}

.font-card .header .dropdown.active .weight {
  cursor: pointer;
}

.font-card .header .dropdown.active .weight .ext {
  background: #704FFF;
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

.font-card .header .dropdown:not(.active) > li {
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
  color: #FF01F3;
  /* `translate` === visual hack */
  transform: rotate(315deg) scale(1.05) translateX(-0.05rem) translateY(0.1rem);
}

.font-card .editable {
  width: 100%;
  margin-top: 0.5em;
  text-align: justify;
}

.font-card .editable.loading {
  user-select: none;
  opacity: 0.3;
}

.font-card .editable.loading::after {
  content: '다운로드 중'
}

.font-card .editable.failed {
  user-select: none;
  color: red;
}

.font-card .editable.failed::after {
  content: '다운로드 실패: 클릭하여 재시도'
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
