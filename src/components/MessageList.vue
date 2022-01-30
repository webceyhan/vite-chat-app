<script setup>

import Message from './Message.vue'

const props = defineProps({
  user: String,
  messages: { type: Array, default: () => [] },
})

</script>

<template>
  <ul class="list-group overflow-auto h-100">
    <message
      v-for="(message, i) in messages"
      :key="i"
      :message="message"
      :own="message.user === user"
    />
  </ul>
</template>
