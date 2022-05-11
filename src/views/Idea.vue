<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col class="pa-0">
          <v-tabs show-arrows class="mb-2">
            <v-tab v-for="btn in buttons" :key="btn.i" :to="btn.to">
              {{ btn.text }}
            </v-tab>
          </v-tabs>
        </v-col>
      </v-row>
      <router-view></router-view>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      buttons: [
        {
          text: "Overview",
          to: `/idea/${this.$route.params.id}`,
          icon: "mdi-finance",
        },
        {
          text: "Revenue",
          to: `/idea/${this.$route.params.id}/revenue`,
          icon: "mdi-finance",
        },
        {
          text: "Social Handles",
          to: `/idea/${this.$route.params.id}/social-handles`,
          icon: "mdi-facebook",
        },
        {
          text: "Post Ideas",
          to: `/idea/${this.$route.params.id}/post-ideas`,
          icon: "mdi-post",
        },
        {
          text: "Design Guide",
          to: `/idea/${this.$route.params.id}/design-guide`,
          icon: "mdi-palette-swatch",
        },
        // { text: "Mood Board", to: "", icon: "mdi-view-dashboard" },
        {
          text: "Links / Resources",
          to: `/idea/${this.$route.params.id}/resources`,
          icon: "mdi-link",
        },
        // { text: "Documents", to: "", icon: "mdi-file-cabinet" },
        // { text: "Surveys", to: `surveys`, icon: "mdi-cloud-question" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
