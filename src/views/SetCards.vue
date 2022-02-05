<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="userName"
        label="고객명"
        hint="고객명을 입력해주세요."
        lazy-rules
        :rules="[ val => val && val.length > 0 || '고객명을 입력해주세요.' ]"
      />

      <q-input
        filled
        type="number"
        v-model="amountOfCards"
        label="총 카드 장 수"
        hint="총 카드 장수를 입력해주세요."
        lazy-rules
        :rules="[ val => val !== null && val !== '' && val > 0 || '총 카드 장 수를 입력해주세요.' ]"
      />

      <q-input
        filled
        type="number"
        v-model="selectedCards"
        label="선택할 카드 장 수"
        hint="선택할 카드 장 수를 입력해주세요."
        lazy-rules
        :rules="[ val => val !== null && val !== '' && val > 0 || '선택할 카드 장 수를 입력해주세요.']"
      />

      <q-input filled v-model="reservationAt" label="예약날짜" :rules="[ val => val && val.length > 0 || '예약 시간을 선택해주세요.' ]">
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
import { ref } from 'vue'
import moment from 'moment'

export default {
  name: 'SetCards',
  props: {
  },
  setup () {
    const userName = ref(null)
    const amountOfCards = ref(0)
    const selectedCards = ref(0)
    const reservationAt = ref(moment().format('YYYY-MM-DD HH:mm'))

    return {
      userName,
      amountOfCards,
      selectedCards,
      reservationAt,
      myLocale: {
        /* starting with Sunday */
        days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
        daysShort: ['일', '월', '화', '수', '목', '금', '토'],
        months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        firstDayOfWeek: 1
      },
      
      onReset () {
        userName.value = null
        amountOfCards.value = 0
        selectedCards.value = 0
        reservationAt.value = null
      }
    }
  },
  methods: {
      onSubmit () {
        if (this.selectedCards > this.amountOfCards) {
          alert('총 카드 장수보다 많이 선택 할 수 없어요.')
          return false
        }

        const params = {
            userName: this.userName,
            amountOfCards: Number(this.amountOfCards),
            selectedCards: Number(this.selectedCards),
            reservationAt: this.reservationAt
        }
        this.$http.post('/api/fortune-telling/setting', params).then(() => {
          this.$router.push('/reservations')
        })
      }
  },
}
</script>

<style scoped>

</style>
