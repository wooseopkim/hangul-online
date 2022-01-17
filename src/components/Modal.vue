<template>
  <div class="modal-wrapper">
    <input id="modal-switch" type="checkbox" @change="onModalChange($event)" />
    <div class="modal-container">
      <label for="modal-switch" class="background"></label>
      <div class="modal">
        <ul class="tabs">
          <li class="tab" v-for="(tab, index) in tabs" :key="index">
            <input
              :id="tab.component.title"
              class="tab-switch"
              type="radio"
              name="tabs"
              :checked="index === initialTab"
              @change="setCurrentIndex(index)"
            />
            <label :for="tab.component.title" class="tab-title">{{
              tab.component.title
            }}</label>
          </li>
        </ul>

        <div class="tab-content">
          <component
            v-for="(tab, index) in tabs"
            :is="tab.component"
            :meta="tab.meta"
            :key="index"
          />
        </div>
      </div>

      <div class="fab-container" v-show="hasCode">
        <button class="fab" @click="copyCSS">
          <i class="material-icons">content_copy</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { generateCSS } from '../lib/stylesheet'

import TabCSS from './TabCss.vue'
import TabUsage from './TabUsage.vue'

const { hostname, port } = window.location
const hostUrl = port ? `//${hostname}:${port}` : `//${hostname}`

export default {
  props: ['store', 'event-bus'],

  data() {
    const meta = {
      store: this.store,
      code: () =>
        this.store.items.map((item) => generateCSS(item, hostUrl)).join('\n\n'),
      hasCode: () => this.hasCode
    }

    const tabs = [
      {
        component: TabCSS,
        meta
      },
      {
        component: TabUsage,
        meta
      }
    ]

    return {
      tabs,
      initialTab: 0,
      currentIndex: 0
    }
  },

  computed: {
    hasCode() {
      return this.store.items.length
    }
  },

  methods: {
    onModalChange(e) {
      const on = e.target.checked
      document.body.style.overflow = on ? 'hidden' : 'initial'
    },

    setCurrentIndex(index) {
      const tabs = document.querySelectorAll('.tab-content > *')
      const previousTab = tabs[this.currentIndex]

      this.currentIndex = index

      const currentTab = tabs[this.currentIndex]

      previousTab.classList.remove('current')
      currentTab.classList.add('current')
    },

    copyCSS() {
      const tabs = this.tabs
      const cssTab = tabs.findIndex((tab) => tab.component.name === TabCSS.name)
      if (this.currentIndex !== cssTab) {
        document.getElementById(tabs[cssTab].component.name).checked = true
        this.setCurrentIndex(cssTab)
      }

      const selection = window.getSelection()
      const range = document.createRange()
      range.selectNodeContents(this.$el.querySelector('.tab-css code'))
      selection.removeAllRanges()
      selection.addRange(range)
      document.execCommand('copy')

      this.eventBus.$emit('snackbar', '성공적으로 복사되었습니다.')
    }
  },

  mounted() {
    this.setCurrentIndex(this.initialTab)

    document.addEventListener('keyup', (e) => {
      const code = e.keyCode || e.which
      if (code !== 8 && code !== 27) {
        return
      }

      document.getElementById('modal-switch').checked = false
    })
  }
}
</script>

<style>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  padding-top: 5%;
  padding-left: 10%;
  padding-right: 10%;
  padding-bottom: 5%;
}

.snackbar.shown ~ .modal-wrapper .modal-container {
  padding-bottom: calc(3rem + 5%);
}

@media (min-width: 810px) {
  .modal-container {
    padding-left: 20%;
    padding-right: 20%;
  }
}

@media (max-width: 425px) {
  .modal-container {
    padding-top: 10%;
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 10%;
  }

  .snackbar.shown ~ .modal-wrapper .modal-container {
    padding-bottom: calc(3rem + 10%);
  }
}

.modal-container .fab-container {
  height: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.modal-container .fab {
  flex: 1;
  transform: translateX(-2rem) translateY(calc(-100% - 2rem));
  background: #be3dff;
  max-width: 4rem;
  height: 4rem;
  outline: none;
  border: none;
  border-radius: 50%;
  box-shadow: 0rem 0.2rem 0.2rem lightgrey;
  cursor: pointer;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.modal-container .fab > i {
  flex: 1;
  align-content: center;
}

.modal-container .fab:active {
  filter: brightness(2.5);
  transition: 2s;
}

.modal-container .fab:not(:active) {
  transition: 0.2s;
}

#modal-switch {
  display: none;
}

#modal-switch:checked ~ .modal-container {
  background: rgba(0, 0, 0, 0.7);
}

#modal-switch:not(:checked) ~ .modal-container {
  visibility: hidden;
  opacity: 0;
}

#modal-switch:checked ~ .modal-container .modal {
  background: white;
}

#modal-switch:not(:checked) ~ .modal-container .modal {
  transform: translateY(-1rem);
}

#modal-switch:checked ~ .modal-container .background {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
}

.modal-container,
.modal {
  transition: 0.2s;
}

.tabs {
  display: flex;
  list-style-type: none;
}

.tab {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
}

.tab-switch {
  display: none;
}

.tab-title {
  cursor: pointer;
  user-select: none;
  display: block;
  width: 100%;
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 1.5rem;
  transition: opacity 0.2s;
}

.tab-content > * {
  padding-top: 1.35rem;
  padding-left: 4rem;
  padding-right: 4rem;
  padding-bottom: 2.5rem;
  transition: opacity 0.5s;
}

.tab-content > *:not(.current),
.tab-content > *:not(.current) * {
  opacity: 0;
  visibility: hidden;
  height: 0;
  padding: 0;
  margin: 0;
}

@media (max-width: 640px) {
  .tab-content > * {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

.tab-switch:checked ~ .tab-title {
  border-bottom: 0.2rem solid #be3dff;
  font-weight: 700;
}

.tab-switch:not(:checked) ~ .tab-title {
  border-bottom: 0.2rem solid transparent;
  opacity: 0.3;
}
</style>
