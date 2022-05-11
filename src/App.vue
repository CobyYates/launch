<template>
  <v-app>
    <Nav v-if="!showNav" />
    <v-row v-if="showNav" id="user" class="mb-1">
      <v-col>
        <Crumbs />
      </v-col>
      <v-col class="d-flex justify-end align-center mx-3">
        <v-btn
          v-if="!isAuthenticated"
          outlined
          class="mt-2 mr-2"
          color="primary"
          to="/login"
        >
          Login
        </v-btn>
        <v-menu
          v-else
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-x
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-avatar class="mt-2" size="40" v-bind="attrs" v-on="on">
              <img :src="`${userProfile.photoURL}`" v-if="userProfile.photoURL" />
              <v-icon large v-else>mdi-account</v-icon>
            </v-avatar>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-action>
                  <v-switch
                    v-model="$vuetify.theme.dark"
                    @change="themeUpdate()"
                    inset
                    persistent-hint
                  />
                </v-list-item-action>
                <v-list-item-title>Theme</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-btn @click="logout" outlined color="primary" block>
                  Logout
                </v-btn>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-col>
    </v-row>

    <v-main style="padding: auto">
      <router-view class="pa-0 ma-0" />
    </v-main>

    <Footer v-if="!showNav" />
  </v-app>
</template>

<script>
import Footer from "@/components/Page/Footer";
import Crumbs from "@/components/Page/BreadCrumbs";
import { mapState } from "vuex";
import { usersCollection } from "@/firebase/credentials";
import Nav from "./components/Page/Nav.vue";
export default {
  name: "App",
  components: {
    Nav,
    Footer,
    Crumbs
  },

  data: () => ({
    nav: true,
    drawer: true,
    menu: false,
    mini: false,
    navigation: [
      { title: "Dashboard", icon: "mdi-home", to: "/dashboard" },
      { title: "My Account", icon: "mdi-home", to: "/my-account" },
      { title: "Progress", icon: "mdi-home", to: "/progress" },
    ],
  }),
  methods: {
    openHome() {
      this.$router.push("/").catch(() => {});
    },
    logout() {
      this.$store.dispatch("logout");
    },
    async themeUpdate() {
      try {
        await usersCollection
          .doc(this.userProfile.uid)
          .collection("settings")
          .doc(this.userSettings.id)
          .update({ theme: this.$vuetify.theme.dark });
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapState(["userProfile", "isAuthenticated", "userSettings"]),
    showNav() {
      let result = true;
      switch (this.$route.path) {
        case "/":
          result = false;
          break;
        case "/login":
          result = false;
          break;
        case "/about":
          result = false;
          break;
        case "/contact":
          result = false;
          break;
        case "/blog":
          result = false;
          break;
        case "/forum":
          result = false;
          break;
        case "/dashboard":
          result = true;
          break;
        default:
          break;
      }
      return result;
    },
  },
};
</script>

<style lang="scss">
.purpleBG {
  background: linear-gradient(
    128deg,
    rgba(106, 7, 204, 1) 0%,
    rgba(160, 112, 255, 1) 100%
  );
}
#user {
  max-height: 65px;
}

a {
  text-decoration: none;
  color: white !important;
}

.noData {
  position: absolute;
  width: 100%;
  max-width: 500px;
  padding: 0 15px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.dots {
  z-index: 8;
}

.cont {
  max-height: 450px!important;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    scrollbar-width: thin;
    scrollbar-color: #fff #ccc;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 20px;
  }
}
</style>
