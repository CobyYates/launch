<template>
  <div>
    <v-row class="">
      <v-col cols="12" class="d-flex align-center pb-0">
        <label class="primary--text">{{ label }}</label>
        <v-icon v-if="checkFlag()" color="red" class="ml-1" small
          >mdi-flag</v-icon
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex align-start justify-space-between pt-0">
        <p v-if="label != 'Product Description'" class="mb-0 mr-5">
          {{ value }}
        </p>
        <div v-else class="mb-0 mr-5" v-html="value" />
        <v-icon size="20" @click="copyValue">mdi-content-copy</v-icon>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar">
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Array, Object],
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      snackText: null,
      snackbar: false,
    };
  },
  methods: {
    checkFlag() {
      let result = false;
      if (this.$store.state.notifications.length > 0) {
        let length = this.$store.state.notifications.filter(
          (e) => e.field == this.label
        ).length;
        result = length > 0 ? true : false;
      }
      return result;
    },
    copyValue() {
      this.snackText = "Value copied to clipboard";
      this.snackbar = true;
      navigator.clipboard.writeText(this.value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
