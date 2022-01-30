<script setup>

import { computed, ref } from 'vue'

const emit = defineEmits(['join', 'leave']);

const props = defineProps({
  active: Boolean
})

const userName = ref('');

const empty = computed(() => userName.value === '')

</script>

<template>
  <div class="input-group">
    <!-- helper text -->
    <span class="input-group-text bg-dark text-light border-secondary">Name</span>

    <input
      type="text"
      class="form-control bg-dark text-light border-secondary"
      placeholder="enter your name and join.."
      v-model="userName"
      :disabled="active"
    />

    <button
      v-if="active"
      class="btn btn-outline-danger"
      type="button"
      @click="emit('leave')"
    >Leave Chat</button>

    <button
      v-else
      class="btn btn-outline-secondary"
      type="button"
      @click="emit('join', userName)"
      :disabled="empty"
    >Join Chat</button>
  </div>
</template>
