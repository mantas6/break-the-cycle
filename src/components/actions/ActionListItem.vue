<script setup>
  import { PlusCircleIcon, MinusCircleIcon , BackspaceIcon, ArrowUpCircleIcon } from '@heroicons/vue/24/outline'
  import { ChartBarIcon } from '@heroicons/vue/16/solid'
  import { useActionsStore } from "@/stores/actions.js";
  import {computed, ref} from "vue";
  import {useActionsTriggersStore} from "@/stores/actionsTriggers.js";
  import {useUnlockStore} from "@/stores/unlock.js";
  import ActionDetailsBlock from "@/components/actions/ActionDetailsBlock.vue";
  import {useActionsHoldStore} from "@/stores/actionsHold.js";

  const props = defineProps({
    name: String,
    item: Object,

    title: String,
    eff: Number,

    baseBalance: Number,
    minBalance: Number,

    notify: Boolean,
    charge: Object,
    durations: Array,
    canExecute: Boolean,
  });

  const actions = useActionsStore();
  const triggers = useActionsTriggersStore();
  const hold = useActionsHoldStore();
  const unlock = useUnlockStore();

  const showDetails = ref(false);

  const isActive = computed(() => actions.active[props.name] !== undefined);
  const canBeIncreased = computed(() => actions.canIncrease(props.name));
  const currentDuration = computed(() => actions.active[props.name])

  const productivityClasses = computed(() => ({
    'text-yellow-300': isActive.value && props.eff < 0.995 && props.eff > 0,
    'text-red-300': isActive.value && !props.eff
  }));

  const color = computed(() => {
    const cat = props.item.category;
    return {
      'bg-green-400': cat === 'Jobs',
      'bg-yellow-400': cat === 'Food',
      'bg-cyan-400': cat === 'Sleep',
    };
  })

  function clearNotify() {
    if (props.notify) {
      triggers.clearNotify(props.name);
    }
  }
</script>

<template>
  <div class="flex p-3 gap-3 justify-between border-dotted border border-zinc-400 hover:border-zinc-300 rounded relative select-none"
   @mouseover="clearNotify"
   @pointerenter="showDetails = true"
   @pointerleave="showDetails = false">
    <div class="flex flex-col cursor-pointer text-sm grow" @click="triggers.execute(name)" @pointerdown="hold.enable(name)" @pointerup="hold.disable" v-hover>
      <div class="flex gap-3" :class="{ 'text-zinc-500': !canExecute }">
        <span class="w-10" v-if="unlock.planner && durations.length">{{ isActive ? currentDuration : '0' }}h</span>
        <div class="flex items-center gap-1">
          <div class="w-2 h-2" :class="color"></div>
          <span class="font-medium">{{ title }}</span>
          <span v-if="notify" class="text-red-300">*</span>
        </div>
      </div>
      <div class="flex gap-2 items-center text-xs">
        <span v-if="minBalance">
          <span v-format:currency="minBalance"></span>
        </span>
        <span v-if="baseBalance && durations.length && unlock.planner">
          <span v-format:currency="baseBalance"></span>
          <span>/h</span>
        </span>
        <span v-if="charge">
          <span v-format="charge.now"></span>
          <span>/</span>
          <span v-format="charge.max"></span>
        </span>
        <span v-if="isActive" class="flex gap-1" :class="productivityClasses">
          <ChartBarIcon class="w-4" />
          <span v-format:percent="eff"></span>
        </span>
      </div>
    </div>
    <div v-if="unlock.planner && durations.length" class="flex gap-1 border-dotted">
      <button @click="actions.increaseToMax(name)" :disabled="!canBeIncreased" v-hover="!canBeIncreased"><ArrowUpCircleIcon class="w-7" /></button>
      <button @click="actions.increase(name)" :disabled="!canBeIncreased" v-hover="!canBeIncreased"><PlusCircleIcon class="w-7" /></button>
      <button @click="actions.decrease(name)" :disabled="!isActive" v-hover="!isActive"><MinusCircleIcon class="w-7" /></button>
      <button @click="actions.remove(name)" :disabled="!isActive" v-hover="!isActive"><BackspaceIcon class="w-7" /></button>
    </div>
    <ActionDetailsBlock :visible="showDetails && unlock.categories" v-bind="item" @hover="showDetails = false" />
  </div>
</template>
