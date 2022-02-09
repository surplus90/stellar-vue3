<template>
  <div class="q-pa-md">

    <q-btn class="btn" color="purple" label="예약 저장" @click="goSetCard"/>

    <q-table
      title="예약"
      :rows="rows"
      :columns="columns"
      row-key="idx"
      hide-pagination
    >

      <template v-slot:body-cell-userLink="props">
        <q-td :props="props">
          {{ `http://158.247.198.238:8080/cards/${props.value}` }}
          <q-btn flat round color="black" icon="content_copy" size="sm" @click="copyLink(props.value)" />
        </q-td>
      </template>

    </q-table>
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
      columns,
      rows
    }
  },
  methods: {
    copyLink (idx) {
      navigator.clipboard.writeText(`http://158.247.198.238:8080/cards/${idx}`)
    },
    goSetCard () {
      this.$router.push('/set/cards')
    }
  },
}
</script>

<style scoped>
.btn {
  margin-bottom: 15px;
}
</style>
