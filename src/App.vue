<script setup>

import { ref } from 'vue';
import { createApi } from './api';
import MessageList from './components/MessageList.vue'
import MessageInput from './components/MessageInput.vue'

const api = createApi();

const user = ref('');
const state = ref(api.state)

const onJoin = () => {
  api.emit('join', user.value)
}

const onSend = (text) => {
  api.emit('message', text)
}

</script>

<template>
  <div
    class="card bg-secondary bg-opacity-25 text-light border-secondary"
    style="max-width: 600px;"
  >
    <!-- Header -->
    <div class="card-header p-4">
      <h1 class="display-5">Chat Application</h1>

      <div class="input-group">
        <span class="input-group-text bg-dark text-light border-secondary">Name</span>
        <input
          type="text"
          class="form-control bg-dark text-light border-secondary"
          placeholder="enter your name and join.."
          v-model="user"
        />
        <button class="btn btn-outline-secondary" type="button" @click="onJoin">Join Chat</button>
      </div>
    </div>

    <!-- Body -->
    <div class="card-body p-4">
      <message-list :user="user" :messages="state.messages" />
    </div>

    <!-- Footer -->
    <div class="card-footer p-4">
      <message-input @send="onSend" />
    </div>
  </div>
</template>

