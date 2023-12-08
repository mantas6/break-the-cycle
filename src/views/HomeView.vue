<script setup>
import { useNervousStore } from "@/stores/body/nervous.js";

const nervous = useNervousStore();

function doAction() {
  const diff = nervous.modifyHealthSt(-175)
  console.log(diff)
}
</script>

<template>
  <div>Physical condition {{ nervous.condition * 100 }}%</div>
  <div>Mental condition {{ nervous.mentalCondition * 100 }}%</div>
  <button @click="doAction">Action</button>
</template>
