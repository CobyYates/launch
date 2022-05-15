<template>
  <div>
    <v-row class="mb-10 px-3">
      <v-col>
        <v-row
          :class="$vuetify.breakpoint.xsAndDown ? 'd-flex flex-column' : ''"
        >
        </v-row>
        <v-divider class="my-5" />
        <v-row>
          <v-col class="d-flex" cols="12" sm="4">
            <v-text-field
              v-model="searchVal"
              outlined
              dense
              hide-details
              prepend-icon="mdi-magnify"
            />
          </v-col>
          <v-col cols="2" class="d-flex align-center">
            <v-btn @click="dialog = true" outlined color="primary" tile>
              Add Product
            </v-btn>
          </v-col>
          <v-spacer />
          <v-col class="justify-end d-flex align-center" cols="10" sm="3">
            <div class="mr-2 d-flex align-center"></div>
            <v-icon @click="tableSet(true)" class="mr-2">mdi-menu</v-icon>
            <v-icon @click="tableSet(false)">mdi-view-grid</v-icon>
          </v-col>
        </v-row>
        <launch-card v-if="products.length > 0" :launches="products" />
        <div v-else class="noData text-center">
          <loading />
          <h2>You have no products saved</h2>
          <p>{{ description }}</p>
          <v-btn
            @click="dialog = true"
            outlined
            color="primary"
            tile
            class="mt-3"
          >
            Add Product
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title> Product Information </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addNew" ref="form">
            <v-text-field
              label="Product Title"
              v-model="product.title"
              outlined
              hide-details
            />
            <v-textarea
              class="my-3"
              label="Description"
              v-model="product.description"
              outlined
              :auto-grow="false"
              no-resize
              rows="4"
              hide-details
            />
            <v-btn @click="add" outlined color="primary">Add Product</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import LaunchCard from "../components/Dashboard/LaunchesGrid.vue";
import { productsCollection, usersCollection } from "@/firebase/credentials";
import { mapState } from "vuex";
import Loading from "../components/Page/Loading.vue";
export default {
  components: {
    LaunchCard,
    Loading,
  },
  data() {
    return {
      search: false,
      description: "Add a product to get started",
      dialog: false,
      searchVal: "",
      counter: {
        title: "launches",
        count: 3,
      },
      product: {
        title: "",
        description: "",
      },
    };
  },
  methods: {
    async add() {
      let result = this.product;
      try {
        await productsCollection.add(result);
        this.product = {
          title: "",
          description: "",
          launchID: this.$route.params.id
        };
      } catch (error) {
        console.log(error);
      }
    },
    async tableSet(val) {
      try {
        await usersCollection
          .doc(this.userProfile.uid)
          .collection("settings")
          .doc(this.userSettings.id)
          .update({ tableView: val });
      } catch (error) {
        console.log(error);
      }
      this.table = val;
    },
  },
  computed: {
    ...mapState(["userProfile", "products", "userSettings"]),
  },
  beforeCreate() {
    this.$store.dispatch("loadProducts", this.$route.params.id);
    this.$store.dispatch("loadNotifications");
  },
};
</script>

<style lang="scss" scoped></style>
