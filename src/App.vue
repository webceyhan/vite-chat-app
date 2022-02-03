<script setup>

import { ref } from 'vue';
import { createApi } from './api';
import UserInput from './components/UserInput.vue'
import MessageList from './components/MessageList.vue'
import MessageInput from './components/MessageInput.vue'

const api = createApi();
const state = ref(api.state)

const onJoin = (userName) => {
  api.emit('join', userName)
}

const onLeave = () => {
  api.emit('leave')
}

const onSend = (text) => {
  api.emit('message', text)
}

</script>

<template>
  <div class="col-md-8 offset-md-2">
    <div class="card bg-dark bg-opacity-50 text-light border-dark">
      <!-- Header -->
      <div class="card-header p-4">
        <h1 class="display-5">
          <img src="./assets/logo.png" class="img-fluid" style="width: 4rem;">
          Chat Application
          </h1>

        <user-input :active="state.active" @join="onJoin" @leave="onLeave" />
      </div>

      <!-- Body -->
      <div class="card-body p-4">
        <message-list :user="state.user" :messages="state.messages" />
      </div>

      <!-- Footer -->
      <div v-if="state.active" class="card-footer p-4">
        <message-input @send="onSend" />
      </div>
    </div>
  </div>
</template>

