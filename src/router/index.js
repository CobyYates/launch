import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import { auth } from "../firebase/credentials";

Vue.use(VueRouter);

let idea = store.state.idea;

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
    path: "/contact",
    name: "Contact",
    component: () =>
      import(/* webpackChunkName: "contact" */ "../views/Contact.vue"),
  },
  {
    path: "/blog",
    name: "Blog",
    component: () => import(/* webpackChunkName: "blog" */ "../views/Blog.vue"),
  },
  {
    path: "/forum",
    name: "Forum",
    component: () =>
      import(/* webpackChunkName: "forum" */ "../views/Forum.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
    meta: { auth: true, breadCrumb: [{ text: "Dashboard" }] },
  },
  // {
  //   path: "/idea",
  //   name: "Idea",
  //   component: () => import(/* webpackChunkName: "idea" */ "../views/Idea.vue"),
  //   meta: { auth: true, breadCrumb: [
  //   { text: ''}
  // ] },
  // },
  {
    path: "/idea/:id",
    name: "IdeaID",
    component: () => import(/* webpackChunkName: "idea" */ "../views/Idea.vue"),
    meta: {
      auth: true,
      breadCrumb: [{ text: "Dashboard", to: "/dashboard" }, { text: "Idea" }],
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
            { text: "Dashboard", to: "/dashboard" },
            { text: idea.title, to: idea.to },
            { text: "Overview" },
          ],
        },
      },
      {
        path: "design-guide",
        name: "DesignGuide",
        component: () =>
          import(
            /* webpackChunkName: "design-guide" */ "../views/DesignGuide.vue"
          ),
        meta: {
          auth: true,
          breadCrumb: [
            { text: "Dashboard", to: "/dashboard" },
            { text: idea.title, to: idea.to },
            { text: "Design Guide" },
          ],
        },
      },
      {
        path: "post-ideas",
        name: "PostIdeas",
        component: () =>
          import(/* webpackChunkName: "post-ideas" */ "../views/PostIdeas.vue"),
        meta: {
          auth: true,
          breadCrumb: [
            { text: "Dashboard", to: "/dashboard" },
            { text: idea.title, to: idea.to },
            { text: "Post Ideas" },
          ],
        },
      },
      {
        path: "revenue",
        name: "Revenue",
        component: () =>
          import(/* webpackChunkName: "revenue" */ "../views/Revenue.vue"),
        meta: {
          auth: true,
          breadCrumb: [
            { text: "Dashboard", to: "/dashboard" },
            { text: idea.title, to: idea.to },
            { text: "Revenue" },
          ],
        },
      },
      {
        path: "social-handles",
        name: "SocialHandles",
        component: () =>
          import(
            /* webpackChunkName: "social-handles" */ "../views/SocialHandles.vue"
          ),
        meta: {
          auth: true,
          breadCrumb: [
            { text: "Dashboard", to: "/dashboard" },
            { text: idea.title, to: idea.to },
            { text: "Social Handles" },
          ],
        },
      },
      {
        path: "resources",
        name: "Resources",
        component: () =>
          import(/* webpackChunkName: "resources" */ "../views/Resources.vue"),
        meta: {
          auth: true,
          breadCrumb: [
            { text: "Dashboard", to: "/dashboard" },
            { text: idea.title, to: idea.to },
            { text: "Resources" },
          ],
        },
      },
      {
        path: "surveys",
        name: "Surveys",
        component: () =>
          import(/* webpackChunkName: "surveys" */ "../views/Surveys.vue"),
        meta: {
          auth: true,
          breadCrumb: [
            { text: "Dashboard", to: "/dashboard" },
            { text: idea.title, to: idea.to },
            { text: "Surveys" },
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
