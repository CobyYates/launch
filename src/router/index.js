import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import { auth } from "../firebase/credentials";

Vue.use(VueRouter);

let launch = store.state.launch;

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/launches",
    name: "Launches",
    component: () =>
      import(/* webpackChunkName: "launches" */ "../views/Launches.vue"),
    meta: { auth: true, breadCrumb: [{ text: "Launches" }] },
  },
  {
    path: "/launch/:id",
    name: "LaunchID",
    component: () =>
      import(/* webpackChunkName: "launch" */ "../views/Launch.vue"),
    meta: {
      auth: true,
      breadCrumb: [{ text: "Launches", to: "/launches" }, { text: "Launch" }],
    },
  },
  {
    path: "/product/:id",
    name: "Product",
    component: () =>
      import(/* webpackChunkName: "launch" */ "../views/Product.vue"),
    meta: {
      auth: true,
      breadCrumb: [{ text: "Launch", to: "/launch" }, { text: "Launch" }],
    },
    children: [
      {
        path: "/",
        name: "Overview",
        component: () =>
          import(
            /* webpackChunkName: "design-guide" */ "../views/Overview.vue"
          ),
        meta: {
          auth: true,
          breadCrumb: [
            { text: "Launches", to: "/launches" },
            { text: launch.title, to: launch.to },
            { text: "Overview" },
          ],
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  // scrollBehavior(to) {
  //   if (to == null)
  //     console.log('')
  //   return { x: 0, y: 0 };
  // },
});

router.beforeEach((to, from, next) => {
  const requiredAuth = to.matched.some((x) => x.meta.auth);

  if (requiredAuth && !auth.currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
