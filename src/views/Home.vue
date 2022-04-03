<template>
  <div class="text-center stars">
    <div class="fixed-center on-click" @click="prompt=true">
      <span class="text-overline title">Stella✨</span>
    </div>

    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Password</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="password" autofocus @keyup.enter="checkPassword" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Enter" @click="checkPassword" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'Home',
  props: {
  },
  setup () {
    const router = useRouter()
    const prompt = ref(false)
    const password = ref('')

    return {
      prompt,
      password,

      checkPassword: () => {
        axios.get(`/api/admin/auth`, {params: {id: 'stella', password: password.value}}).then((res) => {
            if(res.data) {
              router.push('/reservations')
            } else {
              prompt.value = false
              alert("패스워드를 다시 확인해주세요")
            }
        })
      }
    }
  },
}
</script>

<style scoped>
  .title {
    font-size: xx-large;
    color:lightcyan;
  }
  .stars {
    width: 100vw;
    height: 100vh;
    background: url(../assets/stars.png) repeat top center;
    z-index: 0;
  }
  .on-click {
    cursor:pointer;
  }
</style>