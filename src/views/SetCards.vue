<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="userKey"
        label="User Key"
        hint="상담자를 구분 할 수 있는 키 값을 입력해주세요."
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something' ]"
      />

      <q-input
        filled
        type="number"
        v-model="amountOfCards"
        label="총 카드 장 수"
        lazy-rules
        :rules="[ val => val !== null && val !== '' && val > 0 || 'Please type amount of cards' ]"
      />

      <q-input
        filled
        type="number"
        v-model="selectedCards"
        label="선택할 카드 장 수"
        lazy-rules
        :rules="[ val => val !== null && val !== '' && val > 0 || 'Please type amount of cards' ]"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SetCards',
  props: {
  },
  setup () {
    const userKey = ref(null)
    const amountOfCards = ref(0)
    const selectedCards = ref(0)

    return {
      userKey,
      amountOfCards,
      selectedCards,
      
      onReset () {
        userKey.value = null
        amountOfCards.value = 0
        selectedCards.value = 0
      }
    }
  },
  methods: {
      onSubmit () {
        const params = {
            title: this.userKey,
            amountOfCards: Number(this.amountOfCards),
            selectedCards: Number(this.selectedCards)
        }
        this.$http.post('/api/fortune-telling/setting', params).then((res) => {
            console.log(res)
        })
      }
  },
}
</script>

<style scoped>

</style>
