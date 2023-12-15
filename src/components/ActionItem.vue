<script setup>
  import { PlusCircleIcon, MinusCircleIcon , BackspaceIcon} from '@heroicons/vue/24/outline'
  import { useActionsStore } from "@/stores/actions";

  const props = defineProps(['title', 'name']);
  const actions = useActionsStore();
</script>

<template>
  <div class="flex p-3 gap-3 justify-between">
    <div class="flex gap-3">
      <span class="w-10">{{ actions.active[name] ? actions.active[name] * actions.allActive[name].duration : '0' }}h</span>
      <span>{{ title }}</span>
    </div>
    <div class="flex gap-1">
      <button @click="actions.increase(name)"><PlusCircleIcon class="w-7" /></button>
      <button @click="actions.decrease(name)"><MinusCircleIcon class="w-7" /></button>
      <button @click="actions.remove(name)"><BackspaceIcon class="w-7" /></button>
    </div>
  </div>
</template>
