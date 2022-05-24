import Vue from "vue";
import Vuex from "vuex";
import {
  auth,
  launchesCollection,
  productsCollection,
  notificationsCollection,
  usersCollection,
} from "../firebase/credentials.js";
import * as fb from "../firebase/credentials.js";
import router from "../router/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userProfile: {},
    launch: {
      title: null,
      to: null,
    },
    current: 0,
    isAuthenticated: false,
    launches: [],
    postIdeas: [],
    socialHandles: [],
    revenueStreams: [],
    notifications: [],
    posts: [],
    products: [],
    userSettings: {},
    elevation: 1,
    socials: [
      { icon: "mdi-discord", link: "" },
      { icon: "mdi-facebook", link: "" },
      { icon: "mdi-linkedin", link: "" },
      { icon: "mdi-twitter", link: "" },
      { icon: "mdi-instagram", link: "" },
    ],
    lightSVG: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 380.421 744.135">
  <defs>
    <filter id="Union_5" x="0" y="0" filterUnits="userSpaceOnUse">
      <feOffset dy="3" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feFlood flood-opacity="0.631"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Union_5)">
    <path id="Union_5-2" data-name="Union 5" d="M164.973,700.167c-6.076-7.346-13.061-13.892-20.991-22.22,11.387,1.128,20.809,2.037,31.65,3.128-8.768,11.965-5.311,16.875,7.313,16.657,16.953-.291,33.942-.109,50.9-.873,12.842-.582,22.592-5.456,21.21-20.656,8.731-2.473,17.1-4.837,25.43-7.2l-.655-3.492q-36.343,3.928-72.724,7.819l-.654-6.546c23.283-1.382,46.566-2.764,69.7-4.109,5.057-7.965,10-15.711,14.952-23.493-3.638-2.691-7.64-5.674-15.571-11.6,9.233-3.671,15.206-6.031,21.019-8.373-3.2,10.8,3.039,21.188.227,33.284-2.219,9.528-4.438,16.983-10.623,23.784-12.551,13.71-25.139,27.457-38.054,40.84-2.219,2.291-6.038,3.273-9.313,4.254a85,85,0,0,1-24.031,3.749C195.8,725.118,179.1,717.266,164.973,700.167Zm28.267-58.914q27.668-1.363,55.371-2.727l.327,4.437q-27.558,2.509-55.115,5.055C193.64,645.762,193.422,643.508,193.24,641.252Zm-.546-19.238-.109-5.855c18.845-1.164,37.689-2.327,61.228-3.818-5.712,4.328-7.931,6-10.8,8.182h.036l9.968,1.819-.328,4.328Zm104-3.286q-13.287-2.771-26.574-5.521c7.4-7.658,15.081-15.633,25.235-26.1-20.336,2.073-36.271,3.673-52.205,5.31l-.073,2.327c3.493.727,7.022,1.418,10.732,2.182-.764,1.164-1.382,2.727-1.819,2.655-5.335-.573-10.82-.048-16.441.477-12.935,1.208-26.6,2.417-40.821-9.75,27.54-1.455,50.678-2.764,73.815-3.892,14.88-.727,16.116-14.837,21.173-23.711,2.438-4.254-3.455-13.237-6-21.42,3.638-2.437,11.241-7.527,19.863-13.31,3.275,22.475-12.15,39.276-2.983,59.714,3.6,8.074-2.291,20.438-3.82,30.839l.483.322-.169-.035.159.113-.7.282C296.6,619.047,296.647,618.887,296.7,618.728Zm.563.117.026.005.036.036Zm-32.934-6.832q2.9.595,5.8,1.193l-2.923,3.026Zm-66.793-42.476q26.248-1.964,52.5-3.891c.328,2.691.618,5.382.946,8.073h.036l-52.824,3.054Zm20.227-25.784c-2.583-.145-4.947-3.964-7.421-6.11,2.292-2.182,4.985-6.51,6.876-6.182,23.684,4.109,22.083-11.529,21.5-26.657-.182-4.837.909-9.892-.182-14.474-1.091-4.546-4.257-8.619-6.475-12.874-2.8,4.655-7.349,9.092-7.967,14-.873,6.983,1.418,14.329,1.855,21.529.218,3.31-.764,6.728-1.2,10.073l-6.185.619-2.656-42-2.838-.727c-1.891,8.873-3.783,17.783-6.839,32.257-4.548-15.71-7.713-26.657-12.151-41.967-6.075,26.547-10.7,46.731-16.553,72.333-4.8-7.309-7.64-9.6-7.64-11.928-.073-32.476-.473-64.988.946-97.39.4-9.456,6.257-18.729,9.6-28.076l4.62,1.636h-.073c-1.818,11.346-3.6,22.693-5.42,34.039l4.656,2.037c2.4-3.309,4.984-6.473,7.2-9.891,4.948-7.638,9.058-17.311,16.444-1.2.837,1.854,10.878-.509,18.954-1.091,2.583,2.437,7.239,6.873,12.114,11.456,10.15-15.82,5.639-25.457-11.387-28.366-9.2-1.564-18.117-4.8-28.812-7.746.546,1.273-.4.145-.292-.836q3.82-32.294,7.858-64.515c.364-2.763,1.309-5.491,5.275-8.182l-3.6,68.915c2.219.255,4.439.51,6.694.728,1.128-8.474,2.255-16.983,3.384-25.457l3.856-.218c1.019,9.528,2.037,19.056,3.165,29.348h17.79c14.26,13.456,10.8,30.439,10.55,47.823-.4,28.8,2.4,57.6,3.965,89.389-7.716,0-14.838.1-21.668.1C229.563,544.145,223.653,544.063,217.76,543.753ZM97.779,483.676c-.91-54.878-28.267-99.063-54.425-143.867C23.2,305.3,4.027,271,.68,229.69c-3.311-40.44,5.53-77.57,25.1-112.555-5.893,19.493-13.387,38.658-17.316,58.55-9.714,49.459-2.8,96.518,26.484,138.667,15.5,22.293,34.67,42.368,47.767,65.933,11.423,20.584,20.191,44.113,23.72,67.315,4.656,30.366-3.747,63.351,24.448,87.571C113.386,526.37,98.143,505.75,97.779,483.676ZM361.5,361.774c-23.683,40.622-38.271,84.08-40.781,131.1C320.5,430.107,333.885,387.667,361.5,361.774ZM155.769,9.634C212.23-7.749,265.819-2.112,315.332,30.654,264.29,4.87,211.539-4.112,155.769,9.634Z" transform="translate(9.49 6.52)" fill="#fff" stroke="#fff" stroke-width="1"/>
  </g>
</svg>
`,
  },
  mutations: {
    setUserProfile(state, val) {
      state.isAuthenticated = val.email != undefined ? true : false;
      state.userProfile = val;
    },
    setCrumb(state, val) {
      state.crumb = val;
    },
    async setLaunches(state) {
      let documents = await launchesCollection;

      state.launches = [];

      documents.onSnapshot((doc) => {
        doc.docChanges().forEach(async (p) => {
          if (p.type === "added") {
            let obj = p.doc.data();
            obj.id = p.doc.id;
            state.launches.push(obj);
          } else if (p.type === "modified") {
            let id = p.doc.id;
            let index = state.launches.map((obj) => obj.id).indexOf(id);
            state.launches[index] = p.doc.data();
          } else if (p.type === "removed") {
            let id = p.doc.id;
            let index = state.launches.map((obj) => obj.id).indexOf(id);
            state.launches.splice(index, 1);
          }
        });
      });
    },
    async setNotifications(state, id) {
      let notifications;
      if (id) {
        notifications = await notificationsCollection.where(
          "productID",
          "==",
          id
        );
      } else {
        notifications = await notificationsCollection;
      }

      state.notifications = [];

      notifications.onSnapshot((doc) => {
        doc.docChanges().forEach(async (p) => {
          state.current++;
          if (p.type === "added") {
            let obj = p.doc.data();
            obj.id = p.doc.id;
            state.notifications.push(obj);
          } else if (p.type === "modified") {
            let id = p.doc.id;
            let index = state.notifications.map((obj) => obj.id).indexOf(id);
            state.notifications[index] = p.doc.data();
          } else if (p.type === "removed") {
            let id = p.doc.id;
            let index = state.notifications.map((obj) => obj.id).indexOf(id);
            state.notifications.splice(index, 1);
          }
        });
      });
    },
    async setProducts(state, id) {
      let documents = await productsCollection.where("launchID", "==", id);

      state.products = [];

      documents.onSnapshot((doc) => {
        doc.docChanges().forEach(async (p) => {
          if (p.type === "added") {
            let obj = p.doc.data();
            obj.id = p.doc.id;
            state.products.push(obj);
          } else if (p.type === "modified") {
            let id = p.doc.id;
            let index = state.products.map((obj) => obj.id).indexOf(id);
            state.products[index].favorite = p.doc.data().favorite;
          } else if (p.type === "removed") {
            let id = p.doc.id;
            let index = state.products.map((obj) => obj.id).indexOf(id);
            state.products.splice(index, 1);
          }
        });
      });
    },
  },
  actions: {
    async register({ dispatch }, form) {
      let user = null;

      if (!form.providerId) {
        user = await auth.createUserWithEmailAndPassword(
          form.email,
          form.password
        );
      } else {
        user = form;
      }

      console.log(dispatch);

      if (user != null) {
        await usersCollection.doc(`${user.uid}`).set(user);
        let settings = {
          theme: false,
          tableView: false,
        };
        await usersCollection
          .doc(`${user.uid}`)
          .collection("settings")
          .add(settings);
      }

      dispatch("fetchUserProfile", user);

      router.push("/dashboard");
    },

    async login({ dispatch }, form) {
      let user = null;
      if (form.displayName) {
        user = {
          name: form.displayName,
          displayName: form.displayName,
          email: form.email,
          photoURL: form.photoURL,
          providerId: form.providerId,
          uid: form.uid,
        };
      } else {
        user = await auth.signInWithEmailAndPassword(form.email, form.password);
      }

      dispatch("fetchUserProfile", { user });

      // router.push("/dashboard");
    },
    async fetchUserProfile({ commit }, { user }) {
      const userProfile = await usersCollection
        .where("uid", "==", user.uid)
        .get();
      userProfile.forEach((e) => {
        commit("setUserProfile", e.data());
      });

      router.push("/launches");
    },

    async logout({ commit }) {
      await fb.auth.signOut();
      commit("setUserProfile", {});
      router.push("/").catch(() => {});
    },

    loadLaunches({ commit }) {
      commit("setLaunches");
    },
    loadProducts({ commit }, val) {
      commit("setProducts", val);
    },
    loadNotifications({ commit }, val) {
      commit("setNotifications", val);
    },
  },
  modules: {},
});
