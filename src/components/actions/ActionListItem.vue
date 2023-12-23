<script setup>
  import { PlusCircleIcon, MinusCircleIcon , BackspaceIcon} from '@heroicons/vue/24/outline'
  import { useActionsStore } from "@/stores/actions.js";
  import { computed } from "vue";
  import NumberFormat from "@/components/NumberFormat.vue";

  const props = defineProps(['title', 'name', 'eff', 'walletBalance']);
  const actions = useActionsStore();

  const isActive = computed(() => actions.active[props.name] !== undefined);
  const canBeIncreased = computed(() => actions.canIncrease(props.name));
  const currentDuration = computed(() => actions.active[props.name])

  const productivityClasses = computed(() => ({
    'text-yellow-300': isActive.value && props.eff < 1 && props.eff > 0,
    'text-red-300': isActive.value && !props.eff
  }));
</script>

<template>
  <div class="flex p-3 gap-3 justify-between">
    <div class="flex flex-col cursor-pointer" @click="actions.increase(name)">
      <div class="flex gap-3">
        <span class="w-10">{{ isActive ? currentDuration : '0' }}h</span>
        <span>{{ title }}</span>
      </div>
      <div class="flex gap-3 items-center">
        <span v-if="walletBalance" class="text-sm">
          <NumberFormat format="currency" :value="walletBalance" />
          <span class="text-xs"> / h</span>
        </span>
        <span class="text-xs" :class="productivityClasses">Eff <NumberFormat format="percent" :value="eff" /></span>
      </div>
    </div>
    <div class="flex gap-1">
      <button @click="actions.increase(name)" :class="{ 'text-zinc-500': !canBeIncreased }" :disabled="!canBeIncreased"><PlusCircleIcon class="w-7" /></button>
      <button @click="actions.decrease(name)" :class="{ 'text-zinc-500': !isActive }" :disabled="!isActive"><MinusCircleIcon class="w-7" /></button>
      <button @click="actions.remove(name)" :class="{ 'text-zinc-500': !isActive }" :disabled="!isActive"><BackspaceIcon class="w-7" /></button>
    </div>
  </div>
</template>