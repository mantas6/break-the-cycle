<script setup>
import {useActionsStore} from "@/stores/actions.js";
import ActionList from "@/components/actions/ActionList.vue";

const actions = useActionsStore();

</script>

<template>
  <div>
    <ActionList :items="actions.all" grid />
  </div>
</template>
