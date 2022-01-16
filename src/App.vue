<template>
  <div id="app">
    <AppHeader></AppHeader>
    <AppContent :store="store"></AppContent>
    <AppBar :store="store"></AppBar>
    <SnackBar :event-bus="eventBus"></SnackBar>
    <Modal :store="store" :event-bus="eventBus"></Modal>
  </div>
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
