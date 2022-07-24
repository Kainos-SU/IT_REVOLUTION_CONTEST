<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import {RouterView} from "vue-router"
import { useStore } from 'vuex';
const store = useStore();
console.log(store);
store.dispatch("initUser");
</script>

<template>
 <router-view></router-view>
</template>

<style scoped>

</style>
