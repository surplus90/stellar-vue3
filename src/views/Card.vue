<template>
  <div>
    <div class="q-ml-sm">

      <div v-if="userCards.length > 0">
        <span class="text-h6" style="color: antiquewhite;">🔮선택하신 카드</span>
        <div class="card-base">
          <q-card-section horizontal v-for="userCard in userCards" :key=userCard :id=userCard>
              <q-img
                  class="col-2"
                  :src="require(`@/assets` + userCard.imgPath)"
                  style="width: 100px; max-width: 120px;"
              />
              <q-card-section>
                  <span class="text-overline card-description">{{ userCard.cardName }}</span>
              </q-card-section>
          </q-card-section>
      </div>
      </div>

      <span class="text-h6" style="color: antiquewhite;">🔮{{ selectedAmount }}장의 카드를 선택해 주세요.</span>
    
      <div class="row">
        <div class="my-card float-left" v-for="card in cards" :key=card :id=card @click="selectCard(card)"></div>
      </div>
      
      <div class="row q-mt-md" v-if="selectedAmount > 0">
        <q-btn color="grey-4" text-color="purple" glossy unelevated label="카드 선택 완료" @click="submit"/>
      </div>

    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'Card',
  props: {
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const reservationIdx = ref(Number(route.params.idx))
    const cardsAmount = ref(0)
    const selectedAmount = ref(0)
    const cards = ref([])
    const selectedCards = ref(new Map)
    const userCards = ref([])

    const shuffleArrayES6 = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    const selectCard = (card) => {
      if (selectedCards.value.has(card)) {
        document.getElementById(card).style.background = '#eeeae7'
        selectedCards.value.delete(card)
      } else {
        if (selectedCards.value.size < selectedAmount.value) {
          document.getElementById(card).style.background = '#9370DB'
          selectedCards.value.set(card, card)
        }
      }
    }

    const submit = () => {
      if (selectedCards.value.size < selectedAmount.value) {
        alert(`총 ${selectedAmount.value}장의 카드를 선택해 주세요`)
        return false
      }

      const params = {
        reservationIdx: reservationIdx.value,
        cards: [...selectedCards.value.values()]
      }
      axios.post('/api/fortune-telling/pick-cards', params).then(() => {
        alert('카드 선택이 완료 됐습니다.😎')
        router.go()
      })
    }

    onMounted(async () => {
      const detail = await axios.get(`/api/fortune-telling/reservations/${reservationIdx.value}`)
      cardsAmount.value = detail.data.reservation.amountCards
      cards.value = shuffleArrayES6([...new Array(cardsAmount.value).keys()]).filter(o => !detail.data.cards.includes(o.toString()))
      userCards.value = detail.data.cards.map((card, index) => {
                    let cardInfo = detail.data.cardsInfo.find(o => o.seq === card)
                    return {
                        seq: index,
                        cardNo: card,
                        cardName: cardInfo.cardName,
                        imgPath: cardInfo.imgPath
                    }
                })
      selectedAmount.value = detail.data.reservation.selectedCards - userCards.value.length
    });

    return {
      cards,
      selectedAmount,
      reservationIdx,
      selectedCards,
      userCards,

      selectCard,
      submit
    }
  }
}
</script>

<style scoped>

  .my-card {
    width: 70px;
    height: 100px;
    background: #eeeae7;
    border-radius: 8px;
    box-shadow: 0 1px 2px 0 rgba(151,150,146,0.4);
  }

  .card-description {
        color: antiquewhite;
    }

</style>
