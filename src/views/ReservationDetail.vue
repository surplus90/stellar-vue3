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
                <td class="text-left">타로 덱</td>
                <td class="text-left">{{ detail.deckName }}</td>
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
            <span class="text-h6 card-description">🔮선택하신 카드</span>

            <!-- 기본 배열법 -->
            <div v-if="detail.wayToArray === 0" class="row items-start">
                <q-card-section v-for="(card, index) in cards" :key="card.idx" :id="card.idx" style="padding: 2px">
                    <q-img
                        class="col-2"
                        :src="require(`@/assets` + card.imgPath)"
                        style="width: 110px; max-width: 110px;"
                    />
                    <q-card-section style="padding: 5px">
                        <span class="text-overline card-description">[{{++index}}] {{ card.cardName }}</span>
                    </q-card-section>
                </q-card-section>
            </div>

            <!-- 신년운세 배열법 -->
            <div v-if="detail.wayToArray === 1" class="q-pa-md doc-container">
                <table>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <q-img
                                :src="require(`@/assets` + cards[9].imgPath)"
                                style="width: 110px; max-width: 110px;"
                            />
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>
                            <q-img
                                :src="require(`@/assets` + cards[10].imgPath)"
                                style="width: 110px; max-width: 110px;"
                            />
                        </td>
                        <td></td>
                        <td>
                            <q-img
                                :src="require(`@/assets` + cards[8].imgPath)"
                                style="width: 110px; max-width: 110px;"
                            />
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <q-img
                                :src="require(`@/assets` + cards[11].imgPath)"
                                style="width: 110px; max-width: 110px;"
                            />
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <q-img
                                :src="require(`@/assets` + cards[7].imgPath)"
                                style="width: 110px; max-width: 110px;"
                            />
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <q-img
                                :src="require(`@/assets` + cards[0].imgPath)"
                                style="width: 110px; max-width: 110px;"
                            />
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                            <q-img
                                :src="require(`@/assets` + cards[12].imgPath)"
                                style="width: 110px; max-width: 110px;"
                            />
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                            <q-img
                                :src="require(`@/assets` + cards[6].imgPath)"
                                style="width: 110px; max-width: 110px;"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <q-img
                                :src="require(`@/assets` + cards[1].imgPath)"
                                style="width: 110px; max-width: 110px;"
                            />
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <q-img
                                :src="require(`@/assets` + cards[5].imgPath)"
                                style="width: 110px; max-width: 110px;"
                            />
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>
                            <q-img
                                :src="require(`@/assets` + cards[2].imgPath)"
                                style="width: 110px; max-width: 110px;"
                            />
                        </td>
                        <td></td>
                        <td>
                            <q-img
                                :src="require(`@/assets` + cards[4].imgPath)"
                                style="width: 110px; max-width: 110px;"
                            />
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <q-img
                                :src="require(`@/assets` + cards[3].imgPath)"
                                style="width: 110px; max-width: 110px;"
                            />
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>

            <div v-if="cards.length > 12">
                <q-card-section v-for="(card, index) in cards" :key="card.idx" :id="card.idx" style="padding: 2px">
                    <q-img
                        v-if="index > 12"
                        class="col-2"
                        :src="require(`@/assets` + card.imgPath)"
                        style="width: 110px; max-width: 110px;"
                    />
                    <q-card-section v-if="index > 12" style="padding: 5px">
                        <span class="text-overline card-description">[{{++index}}] {{ card.cardName }}</span>
                    </q-card-section>
                </q-card-section>
            </div>
        </div>

        <div v-if="cards.length > 0">
            <div class="text-h6 card-description q-mt-lg">🪄카드를 더 뽑아주세요</div>
            <div class="float-left q-gutter-md" style="max-width: 200px">
                <q-input bg-color="white" filled  v-model.number="requestCard" type="number" label="뽑을 카드 장 수" />
            </div>
            <q-btn class="q-mt-md q-ml-sm" color="brown-5" label="요청" @click="setMoreCards" />
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
        const requestCard = ref(0)

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
            requestCard,

            goList: () => {
                router.push('/reservations')
            },
            setMoreCards: () => {
                axios.put(`/api/fortune-telling/setting/${reservationIdx.value}/cards/${requestCard.value}`).then(() => {
                    alert('카드 추가 요청을 완료했습니다.')
                    router.go()
                })
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
<style scoped>
    .card-description {
        color: antiquewhite;
    }
</style>