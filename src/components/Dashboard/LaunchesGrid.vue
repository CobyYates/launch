<template>
  <v-row v-if="!$store.state.userSettings.tableView">
    <v-col
      cols="12"
      sm="6"
      md="4"
      lg="3"
      v-for="card in launches"
      :key="card.i"
    >
      <v-card height="150" :elevation="$store.state.elevation">
        <v-badge overlap class="badge" color="pink" :content="test" />
        <v-card-text
          class="d-flex align-center justify-space-between px-2 py-0"
        >
          <v-list width="100%">
            <v-list-item class="px-0">
              <v-list-item-avatar tile size="60" class="mr-1">
                <img
                  v-if="card.logo"
                  src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                  alt="John"
                />
                <v-icon
                  :class="
                    $vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-2'
                  "
                  v-else
                >
                  mdi-image
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ card.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <div class="icons">
            <v-menu
              dense
              v-model="card.menu"
              :close-on-content-click="false"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list class="pa-0">
                <v-list-item @click="open">
                  <v-list-item-icon class="mr-3">
                    <v-icon color="primary">mdi-eye</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title
                    >View {{ launch ? "Launch" : "Product" }}</v-list-item-title
                  >
                </v-list-item>
                <v-list-item @click="deleteLaunch(card.id)">
                  <v-list-item-icon class="mr-3">
                    <v-icon color="error">mdi-delete</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    Delete {{ launch ? "Launch" : "Product" }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-card-text>
        <v-btn
          absolute
          bottom
          tile
          left
          @click="open(card.id)"
          outlined
          color="primary"
        >
          View
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col>
      <LaunchesTable :launches="launches" />
    </v-col>
  </v-row>
</template>

<script>
import { launchesCollection, productsCollection } from "@/firebase/credentials";
import LaunchesTable from "./../Dashboard/IdeasTable.vue";
export default {
  components: {
    LaunchesTable,
  },
  data() {
    return {
      fav: true,
      menu: false,
      message: false,
      hints: true,
      myArray: [],
      test: "5",
    };
  },
  props: {
    launches: {
      type: Array,
      default: () => [],
    },
    launch: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    open(id) {
      if (this.launch) {
        this.$router.push(`/launch/${id}`);
      } else {
        this.$router.push(`/product/${id}`);
      }
    },
    async deleteLaunch(id) {
      try {
        if (this.launch) {
          await launchesCollection.doc(id).delete();
        } else {
          await productsCollection.doc(id).delete();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.icons {
  position: absolute;
  top: 10px;
  right: 10px;
}

.badge {
  position: absolute;
  right: -5px;
}
</style>
