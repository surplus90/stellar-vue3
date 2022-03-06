<template>
  <div class="text-center stars">
    <div class="fixed-center">
      <span class="text-overline title">Stella✨</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
  }
}
</script>

<style scoped>
  .title {
    font-size: xx-large;
    color:lightcyan;
  }
  .stars {
    width: 100vw;
    height: 100vh;
    background: url(../assets/stars.png) repeat top center;
    z-index: 0;
  }
</style>