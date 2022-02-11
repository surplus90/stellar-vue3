<template>
  <div class="q-pa-md">

    <q-btn class="btn" color="purple" label="예약 저장" @click="goSetCard"/>

    <q-table
      title="예약"
      :rows="rows"
      :columns="columns"
      row-key="idx"
    >

      <template v-slot:body-cell-userLink="props">
        <q-td :props="props">
          {{ `${this.location}/cards/${props.value}` }}
          <!-- <q-btn flat round color="black" icon="content_copy" size="sm" @click="copyLink(props.value)" /> -->
        </q-td>
      </template>
      <template v-slot:body-cell-setcardsAt="props">
        <q-td :props="props">
          {{ props.value }}
          <q-btn round color="purple" glossy icon="style" size="10px" v-if="props.value" @click="showCards(props.row)" /> 
        </q-td>
      </template>

    </q-table>

    <q-dialog v-model="alert">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">{{ detail.userName }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none" v-for="(card, num) in this.detail.cards" :key="num">
          <q-card
            class="my-card text-white"
            style="background: radial-gradient(circle, #5a3b54 0%, #403a48 100%)"
          >
            <q-card-section>
              <div class="text-h6">{{card}}</div>
            </q-card-section>
          </q-card>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'Reservations',
  props: {
  },
  setup () {
    const location = ref(window.location.origin)
    const columns = ref([])
    const rows = ref([])

    columns.value = [
      { name: 'idx', required: true, label: 'No', align: 'left', field: row => row.idx, sortable: true },
      { name: 'userName', align: 'center', label: '상담명', field: 'userName' },
      { name: 'amountCards', align: 'center', label: '총 카드 장 수', field: 'amountCards' },
      { name: 'selectedCards', align: 'center', label: '선택해야 할 카드 장 수', field: 'selectedCards' },
      { name: 'userLink', align: 'center', label: 'link', field: 'idx' },
      { name: 'reservationAt', align: 'center', label: '예약날짜', field: 'reservationAt', format: val => moment(val).format('YYYY-MM-DD hh:mm:s') },
      { name: 'setcardsAt', align: 'center', label: '카드선택', field: 'setcardsAt', format: val => (val) ? moment(val).format('YYYY-MM-DD hh:mm:s') : '' },
      { name: 'createdAt', align: 'center', label: '생성날짜', field: 'createdAt', format: val => moment(val).format('YYYY-MM-DD hh:mm:s') }
    ]

    axios.get('/api/fortune-telling/reservations').then(res => {
      rows.value = res.data
    })

    return {
      location,
      columns,
      rows,

      alert: ref(false)
    }
  },
  data() {
    return { 
      detail: {}
    }
  },
  methods: {
    copyLink (idx) {
      navigator.clipboard.writeText(`${this.location}/cards/${idx}`)
    },
    goSetCard () {
      this.$router.push('/set/cards')
    },
    showCards (data) {
      this.detail = data
      this.$http.get(`/api/fortune-telling/show-cards/${data.idx}`).then(res => {
        Object.assign(this.detail, { cards : res.data })
      }).then(() => {
        this.alert = true
      })
    }
  },
}
</script>

<style scoped>
.btn {
  margin-bottom: 15px;
}
.my-card {
  width: 70px;
  height: 100px;
  text-align: center;
}
</style>