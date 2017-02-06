<template>
  <div class="modal-wrapper">
    <input id="modal-switch" type="checkbox">
    <div class="modal-container">
      <label for="modal-switch" class="background"></label>
      <div class="modal">
        <ul class="tabs">
          <li class="tab" v-for="(tab, index) in tabs">
            <input
                :id="tab.component.name"
                class="tab-switch"
                type="radio"
                name="tabs"
                :checked="index === initialTab"
                @change="setCurrent(index)"
            >
            <div class="tab-content">
              <component :is="tab.component" :meta="tab.meta"></component>
            </div>
            <label :for="tab.component.name" class="tab-title">{{ tab.component.title }}</label>
          </li>
        </ul>
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
import {generateCSS} from '../lib/stylesheet'

import TabCSS from './tab-css'
import TabUsage from './tab-usage'

const hostURL = 'https://hangul.online'

export default {
  props: ['store', 'event-bus'],
  data () {
    const meta = {
      store: this.store,
      code: () => this.store.map(item => generateCSS(item, hostURL)).join('\n\n'),
      hasCode: () => this.store.length
    }
    const tabs = [{
      component: TabCSS,
      meta
    }, {
      component: TabUsage,
      meta
    }]
    const initialTab = 0
    return {
      tabs,
      initialTab,
      current: null
    }
  },
  computed: {
    hasCode () {
      return this.store.length
    }
  },
  methods: {
    setCurrent (index) {
      this.current = index
    },
    copyCSS () {
      const tabs = this.tabs
      const cssTab = tabs.findIndex(tab => tab.component === TabCSS)
      if (this.current !== cssTab) {
        document.getElementById(tabs[cssTab].component.name).checked = true
        this.setCurrent(cssTab)
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
  mounted () {
    this.setCurrent(this.initialTab)
    const modalSwitch = document.getElementById('modal-switch')
    document.addEventListener('keyup', e => {
      const code = e.keyCode || e.which
      if (code !== 8 && code !== 27) return
      modalSwitch.checked = false
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
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.modal-container .fab {
  flex: 1;
  transform: translateX(-2rem) translateY(calc(-100% - 2rem));
  background: #BE3DFF;
  max-width: 4rem;
  height: 4rem;
  outline: none;
  border: none;
  border-radius: 50%;
  box-shadow: 0rem 0.2rem 0.2rem lightgrey;
  cursor: pointer;
  color: white;
  display: flex;
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

.modal {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: auto;
}

@media (min-width: 1024px) {
  .modal {
    max-width: 80rem;
  }
}

#modal-switch:checked ~ .modal-container .modal {
  background: white;
}

#modal-switch:not(:checked) ~ .modal-container .modal {
  transform: translateY(-1rem);
}

#modal-switch:checked ~ .modal-container .background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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

.tab > .tab-switch {
  display: none;
}

.tab .tab-title {
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

.tab .tab-switch + .tab-content {
  flex: 1;
  word-break: break-all;
  transition: opacity 0.5s;
}

.tab .tab-content > * {
  position: absolute;
  left: 0;
  right: 0;
  padding-top: 3rem;
  padding-left: 4rem;
  padding-right: 4rem;
  padding-bottom: 4rem;
}

@media (max-width: 640px) {
  .tab .tab-content > * {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

.tab .tab-switch:checked ~ .tab-title {
  border-bottom: 0.2rem solid #BE3DFF;
  font-weight: 700;
}

.tab .tab-switch:not(:checked) ~ .tab-title {
  border-bottom: 0.2rem solid transparent;
  opacity: 0.3;
}

.tab > .tab-switch:not(:checked) + .tab-content {
  opacity: 0;
  visibility: hidden;
}
</style>