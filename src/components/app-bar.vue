<template>
  <div class="appbar">
    <span class="text">{{ store.length }}개의 글꼴 선택</span>
    <label for="modal-switch">
      <i class="material-icons">code</i>
    </label>
  </div>
</template>

<script>
export default {
  props: [
    'store'
  ]
}
</script>

<style>
.appbar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 4rem;
  padding-top: 1rem;
  padding-left: 6rem;
  padding-right: 6rem;
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  background: white;
  box-shadow: 0.1rem 0.1rem 0.2rem lightgrey;
  cursor: default;
  user-select: none;
}

.appbar .text {
  flex: 1;
  text-align: right;
  margin-right: 1em;
}

.appbar i {
  cursor: pointer;
}

@media (max-width: 640px) {
  .appbar {
    justify-content: center;
  }

  .appbar .text {
    flex: none;
  }
}

@media (min-width: 1024px) {
  .appbar {
    justify-content: center;
  }

  .appbar .text {
    flex: none;
  }
}
</style>