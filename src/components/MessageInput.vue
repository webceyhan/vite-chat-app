<script setup>
import { computed, ref } from 'vue'

const emit = defineEmits(['send']);

const text = ref('');
const empty = computed(() => text.value === '')

const onSend = () => {
  emit('send', text.value);
  text.value = ''
}

</script>

<template>
  <div class="input-group">
    <textarea
      class="form-control bg-dark text-light border-secondary p-3"
      placeholder="type your message and press send button.."
      v-model="text"
    ></textarea>
    <button class="btn btn-outline-secondary" type="button" :disabled="empty" @click="onSend">Send</button>
  </div>
</template>
