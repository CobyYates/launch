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
        // {
        //   text: "Links / Resources",
        //   to: `/idea/${this.$route.params.id}/resources`,
        //   icon: "mdi-link",
        // },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
