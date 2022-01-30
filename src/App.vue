<script setup>

import { ref } from 'vue';
import MessageList from './components/MessageList.vue'

const user = ref('you')

const messages = ref([
  { user: 'user', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, ipsam?', date: '3:10 PM' },
  { user: 'you', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi totam amet modi aliquam aut', date: '3:15 PM' },
  { user: 'user', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolore sapiente laboriosam tempore facilis blanditiis, recusandae totam explicabo numquam voluptatem ullam laudantium tempora.', date: '4:00 PM' },
  { user: 'you', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolore sapiente laboriosam tempore', date: '6:30 PM' },
])


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
        />
        <button class="btn btn-outline-secondary" type="button">Join Chat</button>
      </div>
    </div>

    <!-- Body -->
    <div class="card-body p-4">
      <message-list :user="user" :messages="messages" />
    </div>

    <!-- Footer -->
    <div class="card-footer p-4">
      <div class="input-group">
        <textarea
          class="form-control bg-dark text-light border-secondary p-3"
          placeholder="type your message and press send button.."
        ></textarea>
        <button class="btn btn-outline-secondary" type="button">Send</button>
      </div>
    </div>
  </div>
</template>

