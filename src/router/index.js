import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "../views/SignIn.vue";
import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/signin",
    name: "signin",
    component: SignIn
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/SignUp.vue")
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/Profile.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: "class-active",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const isPageRequiresAuth = to.matched.some(route => route.meta.requiresAuth);

  console.log("isRequiresAuth: ", isPageRequiresAuth);
  const isAuthenticatedUser = firebase.auth().currentUser;

  if (isPageRequiresAuth && !isAuthenticatedUser) {
    next("/signin");
  } else {
    next();
  }
});

export default router;
