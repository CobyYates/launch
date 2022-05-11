<template>
  <div>
    <v-breadcrumbs :items="breadCrumbs">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          :to="item.to"
          class="text-subtitle-2 primary--text"
          :disabled="item.disabled"
          exact
        >
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  computed: {
    breadCrumbs() {
      if (typeof this.$route.meta.breadCrumb === "function") {
        return this.$route.meta.breadCrumb.call(this, this.$route);
      }
      return this.$route.meta.breadCrumb;
    },
  },
  // async created() {
  //   if (this.crumb && this.page) {
  //     this.crumbs.push({
  //       text: this.page,
  //       disabled: true,
  //     });
  //   } else if (!this.crumb && this.crumbs.length > 2) {
  //     this.crumbs.pop();
  //   }
  // },
};
</script>
