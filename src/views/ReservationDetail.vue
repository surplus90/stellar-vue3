<template>
    <div class="q-pa-md">
        <q-markup-table>
            <tbody>
            <tr>
                <td class="text-left">예약번호</td>
                <td class="text-left">{{ detail.idx }}</td>
            </tr>
            <tr>
                <td class="text-left">상담명</td>
                <td class="text-left">{{ detail.userName }}</td>
            </tr>
            <tr>
                <td class="text-left">총 카드 장 수</td>
                <td class="text-left">{{ detail.amountCards }}</td>
            </tr>
            <tr>
                <td class="text-left">선택할 카드 장 수</td>
                <td class="text-left">{{ detail.selectedCards }}</td>
            </tr>
            <tr>
                <td class="text-left">예약 날짜</td>
                <td class="text-left">{{ detail.reservationAt }}</td>
            </tr>
            <tr>
                <td class="text-left">카드 선택 날짜</td>
                <td class="text-left">{{ detail.setcardsAt }}</td>
            </tr>
            </tbody>
        </q-markup-table>

        <q-btn class="q-mt-md" color="brown-5" label="목록으로" @click="goList" />

        <q-separator class="q-mt-md" />

        <div v-if="cards.length > 0" class="q-mt-md">
            <span class="text-h6" style="color: antiquewhite;">🔮선택하신 카드</span>
            <div class="card-base">

                <q-card-section horizontal v-for="card in cards" :key=card :id=card>
                    <q-img
                        class="col-2"
                        :src="require(`@/assets` + card.imgPath)"
                    />
                    <q-card-section>
                        {{ card.cardName }}
                    </q-card-section>
                </q-card-section>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

export default {
    name: 'ReservationDetail',
    props: {
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const reservationIdx = ref(Number(route.params.idx))
        const detail = ref({})
        const cards = ref([])

        onMounted(() => {
            axios.get(`/api/fortune-telling/reservations/${reservationIdx.value}`).then((res) => {
                detail.value = res.data.reservation
                cards.value = res.data.cards.map((card, index) => {
                    let cardInfo = res.data.cardsInfo.find(o => o.seq === card)
                    return {
                        seq: index,
                        cardNo: card,
                        cardName: cardInfo.cardName,
                        imgPath: cardInfo.imgPath
                    }
                })
            })
        });
        
        return {
            reservationIdx,
            detail,
            cards,

            goList: () => {
                router.push('/reservations')
            }
        }
    }
}
</script>

<style scoped>
</style>
  