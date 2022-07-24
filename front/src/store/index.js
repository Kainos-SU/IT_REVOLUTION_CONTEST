import { createStore } from "vuex";
import auth from "./auth/index";
import tree from "./tree/index"
import axiosPlugin from "../api/vuexPlugin"

const store = createStore({
    modules: {
        auth,
        tree
    },
    plugins: [
        axiosPlugin
    ]
});

export default store;