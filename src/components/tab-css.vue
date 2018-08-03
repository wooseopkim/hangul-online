<template>
  <div class="tab-css">
    <code v-if="hasCode" class="code">{{ code }}</code>
    <div v-else class="empty">
      선택한 글꼴이 없습니다.<br>
      목록 오른쪽의 <i class="material-icons">add_circle_outline</i>를 눌러<br>
      사용할 글꼴을 선택해 보세요.
    </div>
  </div>
</template>

<script>
export default {
  title: 'CSS',

  props: [
    'meta'
  ],

  computed: {
    hasCode () {
      return this.meta.hasCode()
    },

    code () {
      return this.meta.code()
    }
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .tab-css {
    margin: 0 2rem;
  }
}

.tab-css .code {
  font-family: 'D2Coding', monospace;
  white-space: pre-wrap;
  word-break: break-all;
}

.tab-css .empty {
  font-size: 2rem;
  opacity: 0.3;
}

.tab-css .empty i {
  font-size: inherit;
}

@media (max-width: 640px) {
  .tab-css .empty br {
    display: none;
  }
}
</style>