<script setup>
import {computed} from "vue";
import NumberFormat from "@/components/NumberFormat.vue";

const props = defineProps(['title', 'now']);
</script>

<template>
  <div class="flex justify-between">
    <div class="text-zinc-300">{{ title }}</div>
    <div class="flex">
      <slot>
        <span><NumberFormat type="currency" :value="now" /></span>
      </slot>
    </div>
  </div>
</template>
