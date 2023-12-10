<script setup>
import {useActionsStore} from "@/stores/actions.js";
import ActionItem from "@/components/ActionItem.vue";

const actions = useActionsStore();

</script>

<template>
  <div>
    <ActionItem v-for="(action, actionName) in actions.all" :name="actionName" v-bind="action"/>
  </div>
</template>
