<script setup>
import {computed} from "vue";

const props = defineProps(['title', 'now']);

const formatOptions = computed(() => ({
  style: 'currency',
  currency: 'USD',
}));

const formatted = computed(() => Intl.NumberFormat('en-US', formatOptions.value).format(props.now))
</script>

<template>
  <div class="flex justify-between">
    <div class="text-zinc-300">{{ title }}</div>
    <div class="flex">
      <slot>
        <span>{{ formatted }}</span>
      </slot>
    </div>
  </div>
</template>
