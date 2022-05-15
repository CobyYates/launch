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
              Add Launch
            </v-btn>
          </v-col>
          <v-spacer />
          <v-col class="justify-end d-flex align-center" cols="10" sm="3">
            <div class="mr-2 d-flex align-center">
              <v-chip class="mr-2" label color="primary">
                <v-icon left size="20"> mdi-lightbulb-outline </v-icon>
                launches: {{ launches.length }}
              </v-chip>
            </div>
            <v-icon @click="tableSet(true)" class="mr-2">mdi-menu</v-icon>
            <v-icon @click="tableSet(false)">mdi-view-grid</v-icon>
          </v-col>
        </v-row>
        <launch-card
          v-if="filteredLaunches.length > 0"
          :launches="filteredLaunches"
          :launch="true"
        />
        <div v-else class="noData text-center">
          <loading />
          <h2>You have no launches saved</h2>
          <p>{{ description }}</p>
          <v-btn
            @click="dialog = true"
            outlined
            color="primary"
            tile
            class="mt-3"
          >
            Add Launch
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title> Launch Information </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addNew" ref="form"
            ><v-text-field
              label="Launch Title"
              v-model="launch.title"
              outlined
              hide-details
            />
            <v-textarea
              class="my-3"
              label="Description"
              v-model="launch.description"
              outlined
              :auto-grow="false"
              no-resize
              rows="4"
              hide-details
            />
            <v-btn @click="add" outlined color="primary">Add Launch</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import LaunchCard from "../components/Dashboard/LaunchesGrid.vue";
import { launchesCollection, usersCollection } from "@/firebase/credentials";
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
      description: "Add a launch to get started",
      dialog: false,
      searchVal: "",
      counter: {
        title: "launches",
        count: 3,
      },
      launch: {
        title: "",
        description: "",
      },
    };
  },
  methods: {
    async add() {
      let result = this.launch;
      result.favorite = false;
      try {
        await launchesCollection.add(result);
        this.launch = {
          launch: "",
          description: "",
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
    ...mapState(["userProfile", "launches", "userSettings"]),
    filteredLaunches() {
      let result = this.launches;
      if (this.searchVal != "") {
        result = this.launches.filter((e) =>
          e.title.toLowerCase().includes(this.searchVal.toLowerCase())
        );
      }
      return result;
    },
  },
  beforeCreate() {
    this.$store.dispatch("loadLaunches");
    this.$store.dispatch("loadNotifications");
  },
};
</script>

<style lang="scss" scoped></style>
