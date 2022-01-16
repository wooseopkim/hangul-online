<template>
  <AppHeader></AppHeader>
  <AppContent :store="store"></AppContent>
  <AppBar :store="store"></AppBar>
  <SnackBar :event-bus="eventBus"></SnackBar>
  <Modal :store="store" :event-bus="eventBus"></Modal>
</template>

<script lang="ts">
import bus from './lib/event/bus'
import FontFaceObserver from 'fontfaceobserver'

const enable = () => document.body.classList.add('font-loaded')
const enableAnyway = () => setTimeout(enable, 0)
const timeout = 5000
new FontFaceObserver('Spoqa Han Sans Subset')
  .load(null, timeout)
  .then(enable, enableAnyway)

import AppHeader from './components/AppHeader.vue'
import AppContent from './components/AppContent.vue'
import AppBar from './components/AppBar.vue'
import Modal from './components/Modal.vue'
import SnackBar from './components/SnackBar.vue'

export default {
  components: {
    AppHeader,
    AppContent,
    AppBar,
    Modal,
    SnackBar
  },

  data() {
    return {
      store: {
        items: []
      },
      eventBus: bus
    }
  },

  mounted() {
    const outerLinkSelector = 'a[href]:not([href^="#"]):not([href^=javascript])'
    Array.prototype.forEach.call(
      document.querySelectorAll(outerLinkSelector),
      (link) => {
        link.addEventListener('click', (e: any) => {
          ;(window as any).ga(
            'send',
            'event',
            'Interaction',
            'link',
            e.target.href
          )
        })
      }
    )
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  line-height: 1.4;
}

.font-loaded {
  font-family: 'Spoqa Han Sans Subset', sans-serif;
}

input {
  border: none;
}

input:focus,
[contenteditable='true']:focus {
  outline: none;
}

input[type='range'] {
  -webkit-appearance: none;
}

input[type='range']::-webkit-slider-runnable-track {
  height: 1px;
  background: black;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 1px solid black;
  height: 1em;
  width: 1em;
  border-radius: 1em;
  background: white;
  cursor: pointer;
  transform: translateY(-50%);
}

input[type='range']::-moz-range-track {
  height: 1px;
  background: black;
}

input[type='range']::-moz-range-thumb {
  border: 1px solid black;
  height: 1em;
  width: 1em;
  border-radius: 1em;
  background: white;
  cursor: pointer;
}

input[type='range']::-ms-track {
  height: 1px;
  background: transparent;
  border-color: transparent;
  color: transparent;
}

input[type='range']::-ms-fill-lower {
  background: black;
}

input[type='range']::-ms-fill-upper {
  background: black;
}

input[type='range']::-ms-thumb {
  border: 1px solid black;
  height: 1em;
  width: 1em;
  border-radius: 1em;
  background: white;
  cursor: pointer;
  transform: translateY(-50%);
}

.material-icons {
  letter-spacing: -0.1em;
}
</style>
