<script setup>
import StatValue from "@/components/StatValue.vue";
import {CogIcon, HeartIcon} from "@heroicons/vue/16/solid/index.js";
import {toRefs} from "vue";

const props = defineProps({
  title: String,
  stat: Object,
})

const { health, healthLifetime } = toRefs(props.stat);
</script>

<template>
  <div class="flex flex-col items-center">
    <span class="flex gap-1 font-medium"><CogIcon class="w-4" /> {{ title }}</span>
    <div>
      <StatValue format="percent" :item="health">
        <template #title>
          <HeartIcon class="text-green-200 w-4" />
        </template>
      </StatValue>
      <StatValue format="percent" :item="healthLifetime" :diff-low="0.01" :diff-high="0.5">
        <template #title>
          <HeartIcon class="text-red-200 w-4" />
        </template>
      </StatValue>
    </div>
  </div>
</template>
