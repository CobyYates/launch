<template>
  <v-row v-if="!$store.state.userSettings.tableView">
    <!-- <draggable
      v-model="myArray"
      group="people"
      @start="drag = true"
      @end="drag = false"
    > -->
      <v-col cols="12" sm="6" md="4" lg="3" v-for="card in ideas" :key="card.i">
        <v-card height="300" :elevation="$store.state.elevation">
          {{card.order}}
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
              <v-icon @click="starClick(card)" class="py-0">
                mdi-star{{ card.favorite ? "" : "-outline" }}
              </v-icon>
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
                    <v-list-item-title>View Idea</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="deleteIdea(card.id)">
                    <v-list-item-icon class="mr-3">
                      <v-icon color="error">mdi-delete</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title> Delete Idea </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-card-text>
          <v-card-text class="px-2 py-0">
            <p class="mb-1">Tasks Done {{ tasksCompleted(card.tasks) }}</p>
            <v-progress-linear
              height="8"
              class="mb-0"
              :value="progress(card.tasks)"
              :color="progressColor(card.tasks)"
            />
          </v-card-text>
          <v-card-text class="py-3">
            {{ card.description.slice(0, 180) }}
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
            Open
          </v-btn>
        </v-card>
      </v-col>
    <!-- </draggable> -->
  </v-row>
  <v-row v-else>
    <v-col>
      <IdeasTable :ideas="ideas" />
    </v-col>
  </v-row>
</template>

<script>
import { ideasCollection } from "@/firebase/credentials";
import IdeasTable from "./IdeasTable.vue";
// import draggable from "vuedraggable";
export default {
  components: {
    IdeasTable,
    // draggable,
  },
  data() {
    return {
      fav: true,
      menu: false,
      message: false,
      hints: true,
      myArray: [],
    };
  },
  props: {
    ideas: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    staredVal() {
      const result = this.stared;
      return result;
    },
  },
  methods: {
    progress(tasks) {
      let completed = 0;
      if (tasks.length > 0) {
        completed = tasks.filter((e) => e.complete).length;
      }
      return (completed / tasks.length) * 100;
    },
    progressColor(tasks) {
      let result = "red";
      if (this.progress(tasks) == 100) {
        result = "green";
      }
      return result;
    },
    tasksCompleted(tasks) {
      let completed = 0;
      if (tasks.length > 0) {
        completed = tasks.filter((e) => e.complete).length;
      }
      return `${completed}/${tasks.length}`;
    },
    open(id) {
      this.$router.push(`/idea/${id}`);
    },
    starClick(idea) {
      let fav = { favorite: idea.favorite ? !idea.favorite : true };
      console.log(fav);

      ideasCollection.doc(idea.id).update(fav);
    },
    async deleteIdea(id) {
      try {
        await ideasCollection.doc(id).delete();
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
</style>
