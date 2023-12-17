<script setup>
import { computed } from "vue";

const props = defineProps(['format', 'value'])

const formatOptions = computed(() => ({
  style: props.format,
  currency: props.format === 'currency' ? 'USD' : undefined,
}));

const formatter = computed(() => Intl.NumberFormat('en-US', formatOptions.value))

</script>

<template>{{ formatter.format(value) }}</template>
