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
              Add Another
            </v-btn>
          </v-col>
          <v-spacer />
          <v-col class="justify-end d-flex align-center" cols="10" sm="3">
            <div class="mr-2 d-flex align-center">
              <v-chip class="mr-2" label color="primary">
                <v-icon left size="20"> mdi-lightbulb-outline </v-icon>
                IDEAS: {{ ideas.length }}
              </v-chip>
            </div>
            <v-icon @click="tableSet(true)" class="mr-2">mdi-menu</v-icon>
            <v-icon @click="tableSet(false)">mdi-view-grid</v-icon>
          </v-col>
        </v-row>
        <idea-card v-if="filteredIdeas.length > 0" :ideas="filteredIdeas" />
        <div v-else class="noData text-center">
          <loading />
            <h2>You have no business ideas saved</h2>
            <p>{{ description }}</p>
            <v-btn
              @click="dialog = true"
              outlined
              color="primary"
              tile
              class="mt-3"
            >
              Add One
            </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title> Social Handle </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addNew" ref="form"
            ><v-text-field
              label="Idea Title"
              v-model="idea.title"
              outlined
              hide-details
            />
            <v-textarea
              class="my-3"
              label="Description"
              v-model="idea.description"
              outlined
              :auto-grow="false"
              no-resize
              rows="4"
              hide-details
            />
            <v-btn @click="add" outlined color="primary">Add Idea</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import IdeaCard from "../components/Dashboard/IdeasGrid.vue";
import { ideasCollection, usersCollection } from "@/firebase/credentials";
import { mapState } from "vuex";
import Loading from "../components/Page/Loading.vue";
export default {
  components: {
    IdeaCard,
    Loading
},
  data() {
    return {
      description: `Those things that are not written, can easily be forgotten!`,
      search: false,
      dialog: false,
      searchVal: "",
      counter: {
        title: "IDEAS",
        count: 3,
      },
      idea: {
        title: "",
        description: "",
      },
    };
  },
  methods: {
    async add() {
      let result = this.idea;
      result.userID = this.userProfile.uid;
      result.favorite = false;
      try {
        await ideasCollection.add(result);
        this.idea = {
          idea: "",
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
    // sortIdeas() {
    //   let result = this.ideas.sort((a, b) => {
    //     b.favorite - a.favorite;
    //   });
    //   return result
    // },
  },
  computed: {
    ...mapState(["userProfile", "ideas", "userSettings"]),
    filteredIdeas() {
      let result = this.ideas;
      if (this.searchVal != "") {
        result = this.ideas.filter((e) =>
          e.title.toLowerCase().includes(this.searchVal.toLowerCase())
        );
      }
      return result;
    },
  },
  beforeCreate() {
    this.$store.dispatch("loadIdeas");
  },
};
</script>

<style lang="scss" scoped>
</style>
