<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        dark
        color="lime-11"
        v-model="userName"
        label="고객명"
        hint="고객명을 입력해주세요."
        lazy-rules
        :rules="[ val => val && val.length > 0 || '고객명을 입력해주세요.' ]"
      />

      <q-select 
        filled 
        color="lime-11" 
        dark 
        v-model="selectedDeck" 
        :options="deckOptions" 
        label="덱 선택"
        :rules="[ val => val !== null || '덱을 선택해주세요.' ]"
      />

      <q-input
        filled
        dark
        color="lime-11"
        type="number"
        v-model="selectedCards"
        label="선택할 카드 장 수"
        hint="선택할 카드 장 수를 입력해주세요."
        lazy-rules
        :rules="[ val => val !== null && val !== '' && val > 0 || '선택할 카드 장 수를 입력해주세요.']"
      />

      <q-select 
        filled 
        color="lime-11" 
        dark 
        v-model="wayToArray" 
        :options="wayToArrayOptions" 
        label="배열법 선택"
        :rules="[ val => val !== null || '배열법을 선택해주세요.' ]"
      />

      <q-input filled dark color="lime-11" v-model="reservationAt" label="예약날짜" :rules="[ val => val && val.length > 0 || '예약 시간을 선택해주세요.' ]">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
              <div class="row items-center justify-end">
                <q-date v-model="reservationAt" :locale="myLocale" mask="YYYY-MM-DD HH:mm" />
                <q-time v-model="reservationAt" mask="YYYY-MM-DD HH:mm" color="purple" />
              </div>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="닫기" color="primary" flat />
              </div>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'SetCards',
  props: {
  },
  setup () {
    const router = useRouter()
    const userName = ref(null)
    const selectedDeck = ref(null)
    const selectedCards = ref(0)
    const wayToArray = ref(null)
    const reservationAt = ref(moment().format('YYYY-MM-DD HH:mm'))
    const deckOptions = ref([])
    const wayToArrayOptions = ref([])

    onMounted(() => {
        axios.get(`/api/fortune-telling/decks`).then((res) => {
          deckOptions.value = res.data.map(o => { return { label: o.deckName, value: o.idx, amountCards: o.amountCards } })
        })
        wayToArrayOptions.value = [
          { label: '기본', value: 0 },
          { label: '신년운세', value: 1 }
        ]
    });

    const onSubmit = () => {
      if (selectedCards.value > selectedDeck.value.amountCards) {
        alert('총 카드 장수보다 많이 선택 할 수 없어요.')
        return false
      }

      const params = {
          userName: userName.value,
          deckIdx: selectedDeck.value.value,
          amountOfCards: selectedDeck.value.amountCards,
          selectedCards: Number(selectedCards.value),
          wayToArray: Number(wayToArray.value.value),
          reservationAt: reservationAt.value
      }
      axios.post('/api/fortune-telling/setting', params).then(() => {
        router.push('/reservations')
      })
    }

    return {
      userName,
      selectedDeck,
      selectedCards,
      wayToArray,
      reservationAt,
      deckOptions,
      wayToArrayOptions,
      myLocale: {
        /* starting with Sunday */
        days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
        daysShort: ['일', '월', '화', '수', '목', '금', '토'],
        months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        firstDayOfWeek: 1
      },
      
      onSubmit,
      onReset () {
        userName.value = null
        selectedDeck.value = null
        selectedCards.value = 0
        wayToArray.value = 0
        reservationAt.value = null
      }
    }
  }
}
</script>

<style>
  body {
    height: 100vh;
  }
</style>