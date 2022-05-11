<template>
  <v-footer class="pa-10 footer white" height="400">
    <v-row class="d-flex flex-column-reverse flex-md-row">
      <v-col
        cols="12"
        md="6"
        class="d-flex flex-column"
        :class="$vuetify.breakpoint.mdAndUp ? '' : 'text-center'"
      >
        <v-img
          src=""
          max-width="300"
          contain
          :class="$vuetify.breakpoint.mdAndUp ? '' : 'mx-auto'"
        />
        <div :class="$vuetify.breakpoint.mdAndUp ? '' : 'mx-auto'">
          <section id="social" class="d-flex">
            <v-icon
              v-for="s in socials"
              :key="s.i"
              size="30"
              class="my-2 mr-2"
              color="#6A07CC"
            >
              {{ s.icon }}
            </v-icon>
          </section>
        </div>
        <p class="pt-4">© 2022</p>
      </v-col>
      <v-col cols="12" md="6">
        <ul class="pl-0">
          <li
            v-for="link in links"
            :key="link.i"
            class="text-center text-md-left"
          >
            <router-link class="title" :to="link.to">
              {{ link.text }}
            </router-link>
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      links: [
        { text: "Home", to: "/" },
        { text: "About", to: "/about" },
        { text: "Contact", to: "/contact" },
        { text: "Dashboard", to: "/dashboard" },
        // { text: "Blog", to: "/blog" },
        // { text: "Forum", to: "/forum" },
      ],
    };
  },
  computed: {
    ...mapState(["socials"]),
  },
  methods: {
    openSocial(link) {
      window.open(link, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.footer,
p,
.footer a {
  color: #6a07cc !important;
}

ul {
  columns: 2;
  li {
    list-style: none;
    padding: 10px;
  }
}

a {
  text-decoration: none;
}
</style>
