<template>
  <v-card outlined width="auto" flat height="auto" rounded>
    <h3 class="display-4 primary--text">{{ ideas.length }}</h3>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    count: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapState(["elevation"]),
  },
};
</script>

<style lang="scss" scoped></style>
