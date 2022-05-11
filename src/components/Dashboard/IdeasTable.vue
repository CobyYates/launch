<template>
  <div>
    <v-data-table
      :headers="
        $vuetify.breakpoint.smAndUp
          ? headers
          : headers.filter((e) => e.value != 'des')
      "
      :items="ideas"
      @click:row="open"
      class="elevation-1 mb-8"
      mobile-breakpoint
    >
      <template v-slot:item.logo>
        <v-avatar tile class="my-3">
          <v-icon size="70">mdi-image</v-icon>
        </v-avatar>
      </template>

      <template v-if="$vuetify.breakpoint.smAndUp" v-slot:item.des="{ item }">
        {{ description(item.description) }}
      </template>

      <template v-slot:item.tasks="{ item }">
        <v-progress-linear
          height="25"
          :value="progress(item.tasks)"
          :color="progressColor(item.tasks)"
        >
          <template v-slot:default>
            <strong>{{ tasksCompleted(item.tasks) }}</strong>
          </template>
        </v-progress-linear>
      </template>
      <!-- <template v-slot:item.actions class="text-end">
        <v-icon color="error" @click="deleteIdea()">mdi-delete</v-icon>
      </template> -->
    </v-data-table>
  </div>
</template>

<script>
import { ideasCollection } from "@/firebase/credentials";
export default {
  data() {
    return {
      headers: [
        { text: "Logo", value: "logo", width: "10%" },
        { text: "Idea", value: "title", width: "20%" },
        {
          text: "Description",
          value: "des",
          width: "40%",
        },
        {
          text: "Tasks",
          value: "tasks",
          width: this.$vuetify.breakpoint.smAndUp ? "20%" : "30%",
        },
        // { text: "", value: "actions", width: "10%" },
      ],
      loadIndex: null,
    };
  },
  props: {
    ideas: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    description(des) {
      let result = des;
      // let s = this.$vuetify.breakpoint.mdAndUp ? 20 : 20;
      if(this.$vuetify.breakpoint.mdAndDown)
        result = `${des.slice(0,100)}${des.length > 100 ? '...' : ''}`
      else
        result = `${des.slice(0,250)}${des.length > 250 ? '...' : ''}`
      return result;
    },
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
    open(item) {
      this.$router.push(`/idea/${item.id}`);
    },
    async deleteIdea() {
      try {
        await ideasCollection.doc(this.id).delete();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
