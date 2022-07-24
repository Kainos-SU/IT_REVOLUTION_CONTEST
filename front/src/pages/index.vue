<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <h1 class="header__title">Green City Project</h1>
        <button class="header__login-logout-button" @click="toggleAuthorization">
          <template v-if="store.getters.isAuthorized"> LogOut </template>
          <template v-else> LogIn </template>
        </button>
      </div>
    </div>
  </header>
  <main class="main-content">
    <div class="container">
      <Map />
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import Map from "../components/Map.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

const toggleAuthorization = () => {
    if (store.getters.isAuthorized) {
        store.dispatch("logout");
        return;
    }
    router.push("/login")
}
</script>

<style scoped lang="scss">
.container {
  max-width: 1100px;
  width: 90%;
  margin: 0 auto;
}
.header {
    padding: 15px 0;
    background-color: rgb(147, 218, 120);

    &__wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__title {
        font-family: sans-serif;
        color: white;
        font-size: 2.5rem;
    }

    &__login-logout-button {
        font-size: 1.25rem;
        font-family: sans-serif;
        padding: 5px;
        border-radius: 5px;
    }
}
</style>
