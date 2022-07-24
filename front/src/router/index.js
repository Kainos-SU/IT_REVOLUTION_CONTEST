import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/index.vue";
import Register from "../pages/register.vue";
import Login from "../pages/login.vue"

const routes = [ 
    {
        path: "/",
        component: Home,
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/login",
        component: Login
    }
];

export default createRouter({
    history: createWebHashHistory(),
    routes
})