<script setup>
  import { useActionsStore } from "@/stores/actions";

  const props = defineProps(['title', 'name']);
  const actions = useActionsStore();
</script>

<template>
  <div class="flex gap-3 p-3">
    <span class="w-5">{{ actions.active[name] || 0 }}h</span>
    <span>{{ title }}</span>
    <button @click="actions.increase(name)">+</button>
    <button @click="actions.decrease(name)">-</button>
  </div>
</template>
