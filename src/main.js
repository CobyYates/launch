import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { auth, usersCollection } from "./firebase/credentials.js";
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
import "tiptap-vuetify/dist/main.css";

Vue.config.productionTip = false;

Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: "mdi",
});

let app;
auth.onAuthStateChanged(async (user) => {
  if (user && !store.state.isAuthenticated) {
    store.state.isAuthenticated = true;
    const userProfile = await usersCollection
      .where("uid", "==", user.uid)
      .get();
    userProfile.forEach((e) => {
      store.state.userProfile = e.data();
    });

    let userSettings = await usersCollection
      .doc(user.uid)
      .collection("settings");

    userSettings.onSnapshot((doc) => {
      doc.docChanges().forEach(async (p) => {
        vuetify.framework.theme.isDark = p.doc.data().theme;
        store.state.userSettings = p.doc.data();
        store.state.userSettings.id = p.doc.id;
      });
    });
  }
  if (!app) {
    new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
