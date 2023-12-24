<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  message: Object,
  own: Boolean
})

const direction = computed(() => props.own ? 'end' : 'start')
const order = computed(()=> props.own ? 1:0)

</script>

<template>
  <li class="list-group-item border-0 bg-black bg-opacity-25 text-light py-3 my-1">
    <div :class="`d-flex align-items-start justify-content-${direction}`">
      <!-- User -->
      <div :class="`d-flex flex-column m-1 order-${order}`">
        <span class="badge bg-primary mb-1">{{ message.user }}</span>

        <span class="badge text-secondary text-nowrap">{{ message.date }}</span>
      </div>

      <!-- Text -->
      <span :class="`text-${direction} mx-2`">{{ message.text }}</span>
    </div>
  </li>
</template>
