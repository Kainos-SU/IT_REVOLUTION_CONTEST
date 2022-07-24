<template>
  <div class="map" ref="map"></div>
  <div v-show="false" ref="form" class="map-popup">
    <template v-if="text.isEmpty">
      <button>Add new tree</button>
    </template>
    <template v-else>
      <div class="map-popup__image-container">
        <img :src="image" class="map-popup__image" alt="" />
      </div>
      <ul class="map-popup__info">
        <li>
          {{ store.getters.getTree?.treeType }}
        </li>
        <li>
          {{ store.getters.getTree?.addres }}
        </li>
        <li>
          {{ store.getters.getTree?.state }}
        </li>
        <li>
          <router-link :to="`/edit/${store.getters.getTree?._id}`" >Edit</router-link>
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import useMap from "../composable/useMap";
import treeApi from "../api/treeApi.js";
import { useStore } from "vuex";
import {useRouter} from "vue-router";


const router = useRouter();

const store = useStore();

const updateTreesList = (topRight, bottomLeft) => {
  treeApi.getTreesFromView({topRightLat: topRight.lat, topRightLng: topRight.lng, bottomLeftLat: bottomLeft.lat, bottomLeftLng: bottomLeft.lng})
  .then(response => {
    trees.value = response.data;
  })
  .catch(error => console.error(error))
};

const form = ref(null);
const map = ref(null);
const trees = ref([]);

const getTree = async (id) => {
  console.log("get tree");
  await store.dispatch("fetchCurrentTree", id);
  return nextTick();
};

const addNewTree = (lat, lng) => {
  router.push(`/add?lat=${lat}&lng=${lng}`)
};

const getPopupContent = async () => {
  // debugger
  if (!text.isEmpty) {
    await getTree(text.id);
    console.log("store", store.getters.getTree._id)
  }
  return form.value.cloneNode(true);
};

const text = useMap(map, trees, updateTreesList, getPopupContent, addNewTree);

const image = computed(() => store.getters.getCurrentTreeImage);
</script>

<style scoped lang="scss">
.map {
  height: 400px;
}
.map-popup {
  display: flex;
  align-items: center;
  justify-content: center;

  &__image-container {
    width: 50%;
    min-width: 100px;
  }

  &__image {
    width: 100%;
  }
  &__info {
    list-style: none;
    padding: 5px;
    min-width: 100px;
  }
}
</style>
