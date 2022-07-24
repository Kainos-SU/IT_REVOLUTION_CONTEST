import authApi from "../../api/authApi";

export default {
  state: () => ({
    authorized: false,
    isAdmin: false,
    token: "",
    id: "",
  }),

  actions: {
    initUser({ commit }) {
      const localData = window.localStorage.getItem("user");
      if (localData) {
        const userData = JSON.parse(localData);
        commit("SET_TOKEN", userData.token);
        commit("SET_ADMIN_RIGHT", userData.isAdmin);
        commit("SET_ID", userData.id);
        commit("SET_AUTHORIZED");
      } else {
        commit("CLEAR_ALL");
      }
    },
    /**
     *
     * @param {VuexContext} param0
     * @param {{ email: string, password: string }} payload
     */
    login({ commit, state }, payload) {
      if (state.authorized) {
        return;
      }
      return authApi.login(payload).then((response) => {
        if (response.status !== 200) {
          throw new Error("Login error");
        }
        commit("SET_TOKEN", response.data.token);
        commit("SET_ID", response.data._id);
        commit("SET_ADMIN_RIGHT", response.data._id);
        commit("SET_AUTHORIZED");
      });
    },
    /**
     *
     * @param {VuexContext} param0
     * @param {{email: string, password: string, name: string}} payload
     */
    register({ state, commit, dispatch }, payload) {
      if (state.authorized) {
        return;
      }
      return authApi.register(payload).then((response) => {
        if (response.status < 200 || response.status >= 400) {
          commit("CLEAR_ALL");
          throw new Error("Registration Error");
        }
        return dispatch("login", {
          email: payload.email,
          password: payload.password,
        });
      });
    },

    async logout({ commit, state }) {
      if (!state.authorized) {
        return;
      }
      const response = await authApi.logout({
        _id: state.id,
        token: state.token,
      });
      commit("CLEAR_ALL");
    },
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      const localData = window.localStorage.getItem("user");
      if (localData) {
        const userData = JSON.parse(localData);
        userData.token = token;
        window.localStorage.setItem("user", JSON.stringify(userData));
      } else {
        window.localStorage.setItem("user", JSON.stringify({ token }));
      }
    },

    SET_ADMIN_RIGHT(state, isAdmin) {
      state.isAdmin = Boolean(isAdmin);
      const localData = window.localStorage.getItem("user");
      if (localData) {
        const userData = JSON.parse(localData);
        userData.isAdmin = isAdmin;
        window.localStorage.setItem("user", JSON.stringify(userData));
      } else {
        window.localStorage.setItem("user", JSON.stringify({ isAdmin }));
      }
    },
    SET_AUTHORIZED(state) {
      state.authorized = true;
    },
    SET_ID(state, id) {
      state.id = id;
      const localData = window.localStorage.getItem("user");
      if (localData) {
        const userData = JSON.parse(localData);
        userData.id = id;
        window.localStorage.setItem("user", JSON.stringify(userData));
      } else {
        window.localStorage.setItem("user", JSON.stringify({ id }));
      }
    },
    CLEAR_ALL(state) {
      state.id = "";
      state.isAdmin = false;
      state.token = "";
      state.authorized = false;
      window.localStorage.setItem("user", "");
    },
  },

  getters: {
    isAuthorized(state) {
      return state.authorized;
    },
    getToken(state) {
      return state.token;
    },
  },
};
