<template>
  <nav
    id="desktop"
    v-if="$vuetify.breakpoint.mdAndUp"
    class="d-flex justify-space-between"
  >
    <div>
      <v-tabs
        :hide-slider="showSlider"
        center-active
        background-color="transparent"
        dark
      >
        <v-tabs-slider color="white" />
        <v-tab to="/" class="title">HOME</v-tab>
        <v-tab to="/about" class="title">ABOUT</v-tab>
        <v-tab to="/contact" class="title">CONTACT</v-tab>
        <!-- <v-tab to="/blog" class="title">BLOG</v-tab> -->
        <!-- <v-tab to="/forum" class="title">FORUM</v-tab> -->
      </v-tabs>
    </div>
    <div>
      <v-tabs
        :hide-slider="showSlider ? false : true"
        center-active
        background-color="transparent"
        dark
      >
        <v-tabs-slider color="white" />
        <v-tab to="/launches" v-if="isAuthenticated" class="title">
          LAUNCHES
        </v-tab>
        <v-tab
          to="/logout"
          @click="logout"
          v-if="isAuthenticated"
          class="title"
        >
          LOGOUT
        </v-tab>
        <v-tab to="/login" v-else id="logout" class="title"> LOGIN </v-tab>
      </v-tabs>
    </div>
  </nav>
  <nav v-else>
    <!-- <v-icon large id="mobile" color="white" @click.stop="drawer = !drawer">
      mdi-menu
    </v-icon> -->
    <!-- <v-navigation-drawer
      width="100vw"
      right
      light
      v-model="drawer"
      absolute
      temporary
    >
      <v-list class="py-0">
        <v-list-item
          class="purple--text text--darken-1 font-weight-bold d-flex justify-center py-5"
          v-for="item in items"
          :key="item.title"
          :to="item.to"
        >
          {{ item.title }}
        </v-list-item>
        <v-list-item
          class="purple--text text--darken-1 font-weight-bold d-flex justify-center py-5"
          v-if="isAuthenticated"
          to="/dashboard"
        >
          DASHBOARD
        </v-list-item>
        <v-list-item
          class="purple--text text--darken-1 font-weight-bold d-flex justify-center py-5"
          v-if="isAuthenticated"
          @click="logout"
        >
          LOGOUT
        </v-list-item>
        <v-list-item
          class="purple--text text--darken-1 font-weight-bold d-flex justify-center py-5"
          v-else
          to="/login"
        >
          LOGIN
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      drawer: false,
      items: [
        { title: "HOME", to: "/" },
        { title: "ABOUT", to: "/about" },
        { title: "CONTACT", to: "/contact" },
        // { title: "BLOG", to: "/blog" },
        // { title: "FORUM", to: "/forum" },
      ],
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  computed: {
    ...mapState(["isAuthenticated"]),
    showSlider() {
      let result = true;
      if (this.$route.path != "/login") {
        result = false;
      }
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
#desktop {
  position: absolute;
  width: 100vw;
  top: 40px;
  padding: 0 64px;
  z-index: 99;

  a {
    text-decoration: none;
    color: white;
  }

  #logout {
    cursor: pointer;
  }
}

#mobile {
  position: absolute;
  z-index: 7;
  right: 40px;
  top: 40px;
}
</style>
