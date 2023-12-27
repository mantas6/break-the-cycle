<script setup>
import { LockClosedIcon } from '@heroicons/vue/16/solid'

const props = defineProps({ locked: Boolean })
</script>

<template>
  <div class="p-3 bg-zinc-600 rounded-md">
    <template v-if="locked">
      <div class="w-full h-full flex justify-center">
        <LockClosedIcon class="w-4" />
      </div>
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>
