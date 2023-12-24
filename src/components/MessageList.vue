<script setup>

import { ref, watch } from 'vue';
import Message from './Message.vue'

const props = defineProps({
  user: String,
  messages: { type: Array, default: () => [] },
})

const root = ref(null);

watch(props.messages, () => {
  // get teplate ref
  const rootDiv = root.value;

  // scroll to down to show new message with 100ms delay
  setTimeout(() => rootDiv.scrollTop = rootDiv.scrollHeight, 100);
})

</script>

<template>
  <ul ref="root" class="list-group list-group-flush overflow-auto" style="height: 400px;">
    <message
      v-for="(message, i) in messages"
      :key="i"
      :message="message"
      :own="message.user === user"
    />
  </ul>
</template>
