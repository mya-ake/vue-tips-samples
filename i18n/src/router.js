import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Redirecter from "./views/Redirecter.vue";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      locale: {
        category: "home"
      }
    }
  },
  {
    path: "/about",
    name: "about",
    component: About,
    meta: {
      locale: {
        category: "about"
      }
    }
  }
];

const routesI18n = routes.map(route => {
  return {
    path: `/:lang${route.path}`,
    name: `lang-${route.name}`,
    component: route.component,
    meta: route.meta
  };
});

const mergedRoutes = routes
  .map(route => {
    route.component = Redirecter;
    return route;
  })
  .concat(routesI18n);

export default new Router({
  mode: "history",
  routes: [
    ...mergedRoutes,
    {
      path: "*",
      redirect: "/ja"
    }
  ]
});
