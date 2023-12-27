<script setup>
import PanelBlock from "@/components/panels/PanelBlock.vue";
import ActionList from "@/components/actions/ActionList.vue";

import { useActionsStore } from "@/stores/actions";
import StatValue from "@/components/StatValue.vue";
import {useUnlockStore} from "@/stores/unlock";
import {computed} from "vue";

const actions = useActionsStore();
const unlock = useUnlockStore();

const fullyUtilized = computed(() => actions.currentDuration === actions.maxDuration)
</script>

<template>
  <PanelBlock class="flex flex-col gap-2" :locked="!unlock.planner">
    <div class="grid grid-cols-2 gap-3">
      <StatValue title="Planned" format="hour" class="text-sm" :now="actions.currentDuration" />
      <StatValue title="Idle" format="hour" class="text-sm" :class="{ 'text-red-300': !fullyUtilized }" :now="actions.maxDuration - actions.currentDuration" />
    </div>
    <ActionList :items="actions.allActive" />
    <span v-if="!actions.currentDuration" class="text-xs text-center mt-10">No plans</span>
  </PanelBlock>
</template>
