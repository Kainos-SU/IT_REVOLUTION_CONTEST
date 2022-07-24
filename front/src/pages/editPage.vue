<template>
  <div class="edit-page">
    <div class="container">
      <div class="edit-page__form-holder">
        <h1 class="edit-page__title">
          <template v-if="route.path === '/edit'">Edit Tree Data</template>
          <template v-if="route.path === '/add'">Add tree to base</template>
        </h1>
        <div class="edit-page__form">
          <form @submit.prevent="submitForm">
            <div class="edit-page__form-divider">
              <div class="edit-page__upload-holder">
                <Uploader v-model="image" />
              </div>
              <div class="edit-page__fields-holder">
                <Input v-model="treeType" placeholder="Tree type" />
                <Input v-model="addres" placeholder="Address" />
                <Input v-model="leafShape" placeholder="Shape of leaf" />
                <Input
                  v-model="crownRadius"
                  type="number"
                  placeholder="Crown radius"
                />
                <Input v-model="age" type="number" placeholder="Age of tree" />
                <Input v-model="state" placeholder="Current state of tree" />
              </div>
            </div>
            <Button>Upload</Button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@varlet/ui/lib/input/style/index";
import Input from "@varlet/ui/lib/input/Input";
import "@varlet/ui/lib/button/style/index";
import Button from "@varlet/ui/lib/button/Button";
import Uploader from "@varlet/ui/lib/uploader/Uploader";
import "@varlet/ui/lib/uploader/style/index";
import { ref } from "vue";
import { useRoute } from "vue-router";
import treeApi from "../api/treeApi";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";

const toast = useToast();
const store = useStore();
const route = useRoute();
const image = ref([]);
const treeType = ref("");
const addres = ref("");
const leafShape = ref("");
const crownRadius = ref();
const age = ref();
const state = ref("");
const coordinates = route.query ? route.query : {lat: 0, lng: 0}
if (route.path.includes("/edit")) {
  store.dispatch("fetchCurrentTree", route.params.id)
  .then(() => {
    treeType.value = store.getters.getTree.treeType
    addres.value = store.getters.getTree.addres
    leafShape.value = store.getters.getTree.leafShape
    crownRadius.value = store.getters.getTree.crownRadius
    age.value = store.getters.getTree.age
    state.value = store.getters.getTree.state
    coordinates.lat = store.getters.getTree.coordinatesX;
    coordinates.lng = store.getters.getTree.coordinatesY;
  })
}
const submitForm = () => {
  if (!treeType.value || !addres.value || !age.value || !state.value) {
    return;
  }
  const imageToSend = image.value[0] ? image.value[0].file : null;
  console.log(imageToSend);
  const formData = new FormData();
  if (imageToSend) {
    formData.append("imgSrc", imageToSend, imageToSend.name);
  } else {
    formData.append("imgSrc", "");
  }
  formData.append("treeType", treeType.value);
  formData.append("leafShape", leafShape.value);
  formData.append("addres", addres.value);
  formData.append("crownRadius", crownRadius.value);
  formData.append("age", age.value);
  formData.append("state", state.value);
  formData.append("coordinates", `${coordinates.lat}, ${coordinates.lng}`);

  if (route.path === "/add") {
    treeApi.addTree(formData)
    .then(() => {
      toast.success("Tree successfully added");
    })
    .catch(() => {
        toast.error("Error while adding tree")
    });
  } else {
    treeApi.updateTree({form: formData, id: route.params.id})
    .then(() => {
      toast.success("Tree data successfully edited");
    }).catch(() => {
        toast.error("Error while editing tree data")
    });
  }
};
</script>
