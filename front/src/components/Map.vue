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
          {{ text.name }}
        </li>
        <li>
          {{ text.address }}
        </li>
        <li>
          {{ text.state }}
        </li>
        <li>{{ text.img }}</li>
      </ul>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import useMap from "../composable/useMap";

const apiUrl = import.meta.env.VITE_API_URL;

const updateTreesList = (topRight, bottomLeft) => {
  console.log(topRight, bottomLeft);
  fetch(
    `${apiUrl}/api/tree/location?ltx=${topRight.lat}&lty=${bottomLeft.lng}&rbx=${bottomLeft.lat}&rby=${topRight.lng}`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      trees.value = json;
    })
    .catch((error) => console.error(error));
};

const form = ref(null);
const map = ref(null);
const trees = ref([]);

const getTree = (id) => {
  return fetch(`${apiUrl}/api/tree/${id}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      text.address = json.addres;
      text.state = json.state;
      text.img = json.imgSrc;
    })
    .catch((error) => console.error(error));
};

const addNewTree = (lan, lng) => console.log("test", lan, lng);

const getPopupContent = async () => {
  if (!text.isEmpty) {
    await getTree(text.name);
  }
  return form.value.cloneNode(true);
};

const text = useMap(map, trees, updateTreesList, getPopupContent, addNewTree);

const image = computed(() => {
  if (!text.img) {
    return "#";
  }
  const url = new URL(text.img, apiUrl);
  return url.toString();
});
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
