<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <heading title="PROJECT DETAILS" />
        <v-row>
          <v-avatar
            class="mt-3 ml-3"
            :color="$vuetify.theme.dark ? 'grey darken-4' : 'grey lighten-3'"
            tile
            height="124"
            width="124"
            :class="inputStyle"
          >
            <v-img v-if="idea.logo" :src="idea.logo" />
            <span v-else>
              <v-icon>mdi-image</v-icon>
              <p class="mb-0">Logo</p>
            </span>
          </v-avatar>
          <v-col>
            <v-text-field
              v-model="idea.title"
              :hide-details="true"
              outlined
              label="Name"
              :class="inputStyle"
              @blur="updateIdea"
            />
            <v-text-field
              v-model="idea.subheader"
              :hide-details="true"
              outlined
              label="Business Type ( eCommerce, Brick and Mortar )"
              :class="inputStyle"
              @blur="updateIdea"
            />
          </v-col>
        </v-row>
        <v-textarea
          v-model="idea.description"
          :hide-details="true"
          outlined
          label="Description"
          :class="inputStyle"
          :auto-grow="false"
          no-resize
          rows="7"
          @blur="updateIdea"
        />
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <possible-names />
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <possible-domains />
      </v-col>
    </v-row>
    <v-divider class="my-6" />
    <v-row>
      <v-col cols="12" md="6">
        <timeline />
      </v-col>
      <v-col class="mb-8" cols="12" md="6">
        <tasks />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ideasCollection } from "@/firebase/credentials";
import PossibleNames from "../components/Idea/PossibleNames";
import Tasks from "../components/Idea/Tasks";
import Timeline from "../components/Idea/Timeline.vue";
import Heading from "../components/Page/Heading.vue";
import PossibleDomains from "../components/Idea/PossibleDomains.vue";
export default {
  components: {
    PossibleNames,
    Tasks,
    Timeline,
    Heading,
    PossibleDomains,
  },
  data() {
    return {
      idea: {
        title: "",
        description: "",
        logo: "",
      },
    };
  },
  computed: {
    inputStyle() {
      let result = "mb-3";
      return result;
    },
  },
  methods: {
    async updateIdea() {
      try {
        await ideasCollection.doc(this.$route.params.id).update(this.idea);
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    if (this.$route.params) {
      let document = await ideasCollection
        .doc(`${this.$route.params.id}`)
        .get();
      // let subCollectionDocs = await ideasCollection
      //   .doc(document.id)
      //   .collection("tasks")
      //   .get();
      // obj.tasks = [];
      // if (subCollectionDocs.docs.length > 0) {
      //   subCollectionDocs.forEach(async (task) => {
      //     obj.tasks.push(task.data());
      //   });
      // }
      this.idea = document.data();
    }
  },
};
</script>

<style lang="scss" scoped></style>
