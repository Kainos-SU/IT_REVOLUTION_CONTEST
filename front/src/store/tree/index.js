import treeApi from "../../api/treeApi";

export default {
  state: () => ({
    currentTree: null,
  }),
  actions: {
    fetchCurrentTree({ commit }, id) {
      return treeApi.getTreeInfo(id).then((response) => {
        if (response.status !== 200) {
          throw new Error("Error fetching tree data");
        }
        commit("SET_CURRENT_TREE", response.data);
        return response.data;
      });
    },
    clearCurrentTree({ commit }) {
      commit("CLEAR_CURRENT_TREE");
    },
  },
  mutations: {
    SET_CURRENT_TREE(state, tree) {
      state.currentTree = tree;
    },

    CLEAR_CURRENT_TREE(state) {
      state.currentTree = null;
    },
  },
  getters: {
    getTree(state) {
      return state.currentTree;
    },
    getCurrentTreeImage(state) {
      if (!state.currentTree) {
        return "#";
      }
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = new URL(state.currentTree.imgSrc, apiUrl);

      return url.toString();
    },
  },
};
