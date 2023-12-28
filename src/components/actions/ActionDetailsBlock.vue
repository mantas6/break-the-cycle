<script setup>
import { ClockIcon, StarIcon } from '@heroicons/vue/16/solid'
import {computed} from "vue";
import {useUnlockStore} from "@/stores/unlock.js";

defineEmits(['hover'])

const props = defineProps({
  visible: Boolean,
  description: String,
  durations: Array,
  tier: Number,
});

const unlock = useUnlockStore();

const durationsHuman = computed(() => {
  if (!props.durations.length) {
    return 'Manual';
  }

  if (props.durations.length > 5) {
    return props.durations.slice(0, 3).join('h ') + 'h...';
  }

  return props.durations.join('h ') + 'h';
})
</script>

<template>
  <template v-if="visible">
    <div class="absolute z-10 top-full left-0 bg-zinc-500 border-dotted border border-zinc-400 p-3 text-xs" @mouseenter="$emit('hover')">
      <div class="flex flex-col gap-1">
        <div>{{ description }}</div>
        <div class="flex gap-2">
          <div v-if="unlock.planner" class="flex gap-1"><ClockIcon class="w-4"/> {{ durationsHuman }}</div>
          <div v-if="tier" class="flex gap-1"><StarIcon class="w-4" /> {{ tier }}</div>
        </div>
      </div>
    </div>
  </template>
</template>
