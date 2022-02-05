<template>
  <div class="spread-sheet">
    <h3>{{ selectedAmount }}장의 카드를 선택해 주세요.</h3>
    <div class="card-base">
      <div class="my-card" v-for="card in cards" :key=card :id=card :style="{ left: card*30 + 'px' }" @click="selectCard(card)">
        {{card}}
      </div>
    </div>

    <q-btn color="grey-4" text-color="purple" glossy unelevated label="카드 선택 완료" @click="submit"/>
    
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default {
  name: 'Card',
  props: {
  },
  setup() {
    const route = useRoute()
    const reservationIdx = ref(Number(route.params.idx))
    const cardsAmount = ref(0)
    const selectedAmount = ref(0)
    const cards = ref([])

    onMounted(async () => {
      const detail = await axios.get(`/api/fortune-telling/reservations/${reservationIdx.value}`)
      cardsAmount.value = detail.data.amountCards
      selectedAmount.value = detail.data.selectedCards
      cards.value = [...new Array(cardsAmount.value).keys()]
    });

    return {
      cards,
      selectedAmount,
      reservationIdx
    }
  },
  data () {
    return {
      selectedCards: new Map
    }
  },
  methods: {
    selectCard (card) {
      if (this.selectedCards.has(card)) {
        document.getElementById(card).style.background = '#eeeae7'
          this.selectedCards.delete(card)
      } else {
        if (this.selectedCards.size < this.selectedAmount) {
          document.getElementById(card).style.background = '#9370DB'
          this.selectedCards.set(card, card)
        }
      }
    },
    submit () {
      if (this.selectedCards.size < this.selectedAmount) {
        alert(`총 ${this.selectedAmount}장의 카드를 선택해 주세요`)
        return false
      }

      const params = {
        reservationIdx: this.reservationIdx,
        cards: [...this.selectedCards.values()]
      }
      this.$http.post('/api/fortune-telling/pick-cards', params).then(() => {
        alert('카드 선택이 완료 됐습니다.\n잠시만 기다려 주세요😎')
        this.$router.push('/')
      })
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
  height: 120px;
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
