import Vue from "vue";
import Router from "vue-router";
import Form from "./views/Form.vue";
import Confirm from "./views/Confirm.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/form",
      name: "form",
      component: Form
    },
    {
      path: "/confirm",
      name: "confirm",
      component: Confirm
    },
    {
      path: "*",
      redirect: "/form"
    }
  ]
});
