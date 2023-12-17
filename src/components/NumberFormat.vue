<script setup>
import { computed } from "vue";

const props = defineProps(['type', 'value'])

const formatOptions = computed(() => ({
  style: props.type,
  currency: props.type === 'currency' ? 'USD' : undefined,
}));

const formatter = computed(() => Intl.NumberFormat('en-US', formatOptions.value))

</script>

<template>{{ formatter.format(value) }}</template>
