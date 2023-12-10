<script setup>
import Panel from "@/components/Panels/Panel.vue";
import ActionItem from "@/components/ActionItem.vue";

import { useActionsStore } from "@/stores/actions";
import StatValue from "@/components/StatValue.vue";

const actions = useActionsStore();
</script>

<template>
  <Panel class="flex flex-col">
    <div class="grid grid-cols-2 gap-3">
      <StatValue title="Planned hours">
        <span>{{ actions.currentDuration }}h / {{ actions.maxDuration }}h</span>
      </StatValue>
    </div>
    <ActionItem v-for="(action, actionName) in actions.allActive" :name="actionName" v-bind="action"/>
  </Panel>
</template>
