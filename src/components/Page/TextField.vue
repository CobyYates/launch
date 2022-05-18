<template>
  <v-text-field
    ref="value"
    :value="value"
    :hide-details="true"
    @blur="passData($event)"
    :label="label"
    class="mb-3"
    outlined
    dense
  >
    <template v-if="icon" v-slot:append-outer>
      <v-icon> mdi-update </v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    icon: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // localValue: {
    //   get() {
    //     return this.value;
    //   },
    //   set() {
    //     // this.$emit("blur", value);
    //     console.log('here')
    //   },
    // },
  },
  methods: {
    passData(val) {
      this.$emit("blur", val.target._value, this.label);
    }
  },
};
</script>

<style lang="scss" scoped></style>
