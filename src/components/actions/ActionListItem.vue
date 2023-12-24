<script setup>
  import { PlusCircleIcon, MinusCircleIcon , BackspaceIcon} from '@heroicons/vue/24/outline'
  import { useActionsStore } from "@/stores/actions.js";
  import { computed } from "vue";
  import NumberFormat from "@/components/NumberFormat.vue";

  const props = defineProps({
    title: String,
    name: String,
    eff: Number,
    baseBalance: Number,
    notify: Boolean,
  });

  const actions = useActionsStore();

  const isActive = computed(() => actions.active[props.name] !== undefined);
  const canBeIncreased = computed(() => actions.canIncrease(props.name));
  const currentDuration = computed(() => actions.active[props.name])

  const productivityClasses = computed(() => ({
    'text-yellow-300': isActive.value && props.eff < 1 && props.eff > 0,
    'text-red-300': isActive.value && !props.eff
  }));

  function clearNotify() {
    if (props.notify) {
      actions.clearNotify(props.name);
    }
  }
</script>

<template>
  <div class="flex p-3 gap-3 justify-between border-dotted border border-zinc-400" @mouseover="clearNotify">
    <div class="flex flex-col cursor-pointer" @click="actions.increase(name)">
      <div class="flex gap-3">
        <span class="w-10">{{ isActive ? currentDuration : '0' }}h</span>
        <div>
          <span>{{ title }}</span>
          <span v-if="notify" class="text-red-300">*</span>
        </div>
      </div>
      <div class="flex gap-3 items-center">
        <span v-if="baseBalance" class="text-sm">
          <NumberFormat format="currency" :value="baseBalance" />
          <span class="text-xs"> / h</span>
        </span>
        <span v-if="isActive" class="text-xs" :class="productivityClasses">Eff <NumberFormat format="percent" :value="eff" /></span>
      </div>
    </div>
    <div class="flex gap-1 border-dotted">
      <button @click="actions.increase(name)" :disabled="!canBeIncreased" v-hover="!canBeIncreased"><PlusCircleIcon class="w-7" /></button>
      <button @click="actions.decrease(name)" :disabled="!isActive" v-hover="!isActive"><MinusCircleIcon class="w-7" /></button>
      <button @click="actions.remove(name)" :disabled="!isActive" v-hover="!isActive"><BackspaceIcon class="w-7" /></button>
    </div>
  </div>
</template>
