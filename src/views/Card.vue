<template>
  <div>
    <header>
      STELLA🌟TARO
    </header>

    <div style="padding: 0 0.4rem;">

      <div v-if="userCards.length > 0">
        <div class="text-h6 title">선택하신 카드</div>
        <div class="row spread-sheet">
          <div style="display: table-row; padding: 0.5rem 0;" v-for="userCard in userCards" :key=userCard :id=userCard>
            <q-img
                  class="col-2"
                  :src="require(`@/assets` + userCard.imgPath)"
                  style="width: 100px; height: 175px;"
              />
            <div style="vertical-align: bottom;">
              <span class="card-description">{{ userCard.cardName }}</span>
            </div>
          </div>
        </div>

        <div class="a-link q-mt-md q-mb-md" v-if="selectedAmount===0" onclick="javascript:location.reload()">스텔라가 추가 카드 뽑기를 권했나요?</div>
      </div>

      <div v-if="selectedAmount > 0">
        <div class="text-h6 title">{{ selectedAmount }}장의 카드를 선택해 주세요.</div>
        <div class="row spread-sheet">
          <div class="tarot-deck" :class="`card-unflipped-${deckIdx}`" v-for="card in cards" :key=card :id=card @click="selectCard(card)"></div>
        </div>
        <div class="row q-mt-md q-mb-md">
          <button id="btnSubmit" class="btn-submit" @click="submit" disabled>카드 선택 완료</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { onMounted, ref, watchEffect } from 'vue'
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
    const encKey = ref(route.query.key)
    const deckIdx = ref(0)
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
        document.getElementById(card).classList.remove('card-flipped-' + deckIdx.value)
        document.getElementById(card).classList.add('card-unflipped-' + deckIdx.value)
        selectedCards.value.delete(card)
      } else {
        if (selectedCards.value.size < selectedAmount.value) {
          document.getElementById(card).classList.remove('card-unflipped-' + deckIdx.value)
          document.getElementById(card).classList.add('card-flipped-' + deckIdx.value)
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
      const detail = await axios.get(`/api/fortune-telling/reservations/${reservationIdx.value}?encKey=${encKey.value}`)
      reservationIdx.value = detail.data.reservation.idx
      deckIdx.value = detail.data.reservation.deckIdx
      cardsAmount.value = detail.data.reservation.amountCards
      cards.value = shuffleArrayES6([...new Array(cardsAmount.value).keys()]).filter(o => !detail.data.cards.includes(o))
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

    watchEffect(() => {
      if (selectedCards.value.size < selectedAmount.value) {
        if (document.getElementById('btnSubmit')) {
          document.getElementById('btnSubmit').classList.remove('clickable')
          document.getElementById('btnSubmit').disabled = true
        }
      } else {
        if (document.getElementById('btnSubmit')) {
          document.getElementById('btnSubmit').classList.add('clickable')
          document.getElementById('btnSubmit').disabled = false
        }
      }
    })

    return {
      deckIdx,
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
  header {
    text-align: center;
    padding: 0.6rem 0;
    color: #315FFF;
    font-weight: 700;
    background: url('../assets/header_star_left.svg') no-repeat left, url('../assets/header_star_right.svg') no-repeat right;
  }
  .title {
    color: white;
    text-align: center;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    padding: 1.8rem 0;
    letter-spacing: -0.04em;
  }
  .a-link {
    color: #315FFF;
    text-align: center;
    text-decoration: underline;
  }
  .card-description {
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    color: white;
  }
  .spread-sheet {
    display: flex;
    justify-content: space-evenly;
  }
  .tarot-deck {
    width: 48px;
    height: 82px;
    margin: 0.2rem 0;
  }
  .card-unflipped-1, .card-unflipped-4 {
    background: url('../assets/deck_uni.svg') no-repeat 100%;
  }
  .card-flipped-1, .card-flipped-4 {
    background: url('../assets/pick_uni.svg') no-repeat 100%;
  }
  .card-unflipped-2 {
    background: url('../assets/deck_horoscope.svg') no-repeat 100%;
  }
  .card-flipped-2 {
    background: url('../assets/pick_horoscope.svg') no-repeat 100%;
  }
  .card-unflipped-3 {
    background: url('../assets/deck_symbolon.svg') no-repeat 100%;
  }
  .card-flipped-3 {
    background: url('../assets/pick_symbolon.svg') no-repeat 100%;
  }
  .card-unflipped-5 {
    background: url('../assets/deck_wheeloftime.svg') no-repeat 100%;
  }
  .card-flipped-5 {
    background: url('../assets/pick_wheeloftime.svg') no-repeat 100%;
  }
  .card-unflipped-6 {
    background: url('../assets/deck_lenormand.svg') no-repeat 100%;
  }
  .card-flipped-6 {
    background: url('../assets/pick_lenormand.svg') no-repeat 100%;
  }
  .card-unflipped-7 {
    background: url('../assets/deck_jy.svg') no-repeat 100%;
  }
  .card-flipped-7 {
    background: url('../assets/pick_jy.svg') no-repeat 100%;
  }
  .btn-submit {
    width: 100%;
    height: 48px;
    border-radius: 4px;
    background: rgba(60, 71, 112, 0.35);
    border: 1px solid rgba(60, 71, 112, 0.35);
    color: #797D8F;
  }
  .clickable {
    background: rgba(18, 52, 183, 0.6);
    border: 1px solid rgba(193, 206, 255, 0.3);
    color: #C8D3FF;
  }
</style>
