import api from "../api/apiInstance";

export default function (store) {
  store.watch(
    (state, getters) => getters.isAuthorized,
    (current) => {
      if (current) {
        const token = store.getters.getToken;
        api.defaults.headers.common["Authorization"] = token;
      } else {
        api.defaults.headers.common["Authorization"] = null;
      }
    },
    { immediate: true }
  );
}
