<template>
  <div class="spread-sheet">
    <h2>Pick your card</h2>
    <div class="card-base">
      <div class="my-card" v-for="card in cards" :key=card :style="{ left: card*30 + 'px' }">
        {{card}}
      </div>
    </div>
    
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Card',
  props: {
    msg: String
  },
  setup() {
    const cards = ref([])
    cards.value = [...new Array(78).keys()]

    return {
      cards
    }
  }
}
</script>

<style scoped>

.spread-sheet {
  width: 100%;
}

.card-base {
  position: relative;
  margin-left: 10px;
}

.my-card {
  width: 80px;
  height: 110px;
  background: #eeeae7;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(151,150,146,0.4);
  float: left;
  position: absolute;
}

</style>
