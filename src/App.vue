<script setup>
import { RouterView } from 'vue-router'
import ProductivityPanel from "@/components/ProductivityPanel.vue";
import LocationPanel from "@/components/LocationPanel.vue";
import Panel from "@/components/Panel.vue";
import PlannerPanel from "@/components/PlannerPanel.vue";
import DetailsPanel from "@/components/DetailsPanel.vue";
</script>

<template>
  <div class="grid grid-cols-4 gap-4 m-3">
    <ProductivityPanel />
    <LocationPanel class="col-span-2" />
    <DetailsPanel class="row-span-2" />

    <PlannerPanel />
    <Panel class="col-span-2">
      <RouterView />
    </Panel>
  </div>
</template>

