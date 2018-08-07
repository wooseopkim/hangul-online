<template>
  <div
    class="snackbar"
    :class="{ shown }"
  >{{ msg }}</div>
</template>

<script>
const ttl = 2000

export default {
  props: [
    'event-bus'
  ],

  data () {
    return {
      msg: 0,
      shown: false
    }
  },

  methods: {
    show (msg) {
      const id = this.id
      if (id) {
        clearTimeout(id)
      }

      this.shown = true
      this.msg = msg
      this.id = setTimeout(() => {
        this.shown = false
      }, ttl)
    }
  },

  created () {
    this.eventBus.$on('snackbar', msg => this.show(msg))
  }
}
</script>

<style>
.snackbar {
  position: fixed;
  width: 100%;
  bottom: 0;
  background: black;
  color: white;
  font-size: 1.2rem;
  padding-top: 1rem;
  padding-left: 4rem;
  padding-right: 4rem;
  padding-bottom: 1rem;
  z-index: 1;
  transition: 0.2s;
}

@media (max-width: 480px) {
  .snackbar {
    font-size: 1rem;
  }
}

.snackbar:not(.shown) {
  transform: translateY(100%);
}
</style>
