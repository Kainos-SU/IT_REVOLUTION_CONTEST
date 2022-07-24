import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/index.vue";
import Register from "../pages/register.vue";
import Login from "../pages/login.vue";
import Edit from "../pages/editPage.vue";

console.log(Edit);


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
        path: "/edit/:id",
        component: Edit,
    },
    {
        path: "/add",
        component: Edit,
        beforeEnter: (to, from, next) => {
            if(("lat" in to.query) && ("lng" in to.query)) {
                next(true);
                return;
            }
            next("/")
        }
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/close",
        redirect: "/"
    },
];

export default createRouter({
    history: createWebHashHistory(),
    routes
})