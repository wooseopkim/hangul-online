<template>
  <main class="content">
    <font-card v-once v-for="font in fonts" :model="font" :toggle="toggle"></font-card>
  </main>
</template>

<script>
import fonts from '../assets/fonts/data.json'
import FontCard from './font-card'

export default {
  props: ['store'],
  components: {
    FontCard
  },
  data () {
    const toggle = (item) => {
      this.store.includes(item)
          ? this.store.splice(this.store.indexOf(item), 1)
          : this.store.push(item)
    }
    return {fonts, toggle}
  }
}
</script>

<style>
.content {
  margin-left: 40%;
  width: 60%;
  margin-top: 7rem;
}

@media (min-width: 1440px) {
  .content {
    padding-right: 10%;
  }
}

@media (max-width: 810px) {
  .content {
    margin-left: initial;
    width: 100%;
    margin-top: 1rem;
  }
}
</style>