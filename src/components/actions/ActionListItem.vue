<script setup>
  import { PlusCircleIcon, MinusCircleIcon , BackspaceIcon, ArrowUpCircleIcon } from '@heroicons/vue/24/outline'
  import { ChartBarIcon } from '@heroicons/vue/16/solid'
  import { useActionsStore } from "@/stores/actions.js";
  import {computed, ref} from "vue";
  import {useActionsTriggersStore} from "@/stores/actionsTriggers.js";
  import {useUnlockStore} from "@/stores/unlock.js";
  import ActionDetailsBlock from "@/components/actions/ActionDetailsBlock.vue";

  const props = defineProps({
    name: String,
    item: Object,

    title: String,
    eff: Number,
    baseBalance: Number,
    notify: Boolean,
    once: Boolean,
    charge: Object,
    durations: Array,
    canExecute: Boolean,
  });

  const actions = useActionsStore();
  const triggers = useActionsTriggersStore();
  const unlock = useUnlockStore();

  const showDetails = ref(false);

  const isActive = computed(() => actions.active[props.name] !== undefined);
  const canBeIncreased = computed(() => actions.canIncrease(props.name));
  const currentDuration = computed(() => actions.active[props.name])

  const productivityClasses = computed(() => ({
    'text-yellow-300': isActive.value && props.eff < 0.995 && props.eff > 0,
    'text-red-300': isActive.value && !props.eff
  }));

  function clearNotify() {
    if (props.notify) {
      triggers.clearNotify(props.name);
    }
  }
</script>

<template>
  <div class="flex p-3 gap-3 justify-between border-dotted border border-zinc-400 hover:border-zinc-300 rounded relative"
   @mouseover="clearNotify"
   @mouseenter="showDetails = true"
   @mouseleave="showDetails = false">
    <div class="flex flex-col cursor-pointer text-sm grow select-none" @click="triggers.execute(name)" v-hover>
      <div class="flex gap-3" :class="{ 'text-zinc-500': !canExecute }">
        <span class="w-10" v-if="unlock.planner">{{ isActive ? currentDuration : '0' }}h</span>
        <div>
          <span class="font-medium">{{ title }}</span>
          <span v-if="notify" class="text-red-300">*</span>
        </div>
      </div>
      <div class="flex gap-3 items-center text-xs">
        <span v-if="baseBalance">
          <span v-format:currency="baseBalance"></span>
          <span v-if="unlock.planner && !charge"> / h</span>
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
    <ActionDetailsBlock :visible="showDetails && unlock.categories" v-bind="item" />
  </div>
</template>
