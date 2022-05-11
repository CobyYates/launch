<template>
  <v-row
    class="purpleBG pa-16"
    :class="$vuetify.breakpoint.mdAndUp ? '' : 'justify-center'"
  >
    <v-col cols="12" md="6" class="d-flex align-center my-16">
      <v-row>
        <v-col
          cols="6"
          sm="4"
          md="3"
          class="d-flex justify-center"
          v-for="tool in tooling"
          :key="tool.i"
        >
          <div
            class="d-flex flex-column align-center justify-center white tool elevation-2"
          >
            <v-icon size="50" color="purple darken-3">{{ tool.icon }}</v-icon>
            <p
              class="purple--text text--darken-3 text-center font-weight-bold mt-2"
            >
              {{ tool.text }}
            </p>
          </div>
        </v-col>
      </v-row>
    </v-col>
    <v-col
      cols="12"
      md="6"
      :class="$vuetify.breakpoint.mdAndUp ? 'px-10' : ''"
      class="d-flex align-center"
    >
      <div :class="$vuetify.breakpoint.mdAndUp ? '' : 'text-center'">
        <h2 class="display-1 mb-5 white--text">A PLACE FOR EVERYTHING</h2>
        <p class="title font-weight-light white--text">{{ toolText }}</p>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      tooling: [
        {
          icon: "mdi-palette-swatch-outline",
          text: "DESIGN GUIDE",
        },
        {
          icon: "mdi-order-bool-ascending-variant",
          text: "TASKS",
        },
        {
          icon: "mdi-tag-outline",
          text: "BUSINESS NAMES",
        },
        {
          icon: "mdi-web",
          text: "DOMAIN NAMES",
        },
        {
          icon: "mdi-chart-areaspline",
          text: "REVENUE PLAN",
        },
        {
          icon: "mdi-instagram",
          text: "SOCIAL HANDLES",
        },
        {
          icon: "mdi-chart-arc",
          text: "SURVEYS",
        },
        {
          icon: "mdi-chart-timeline-variant",
          text: "TIMELINE PLAN",
        },
      ],
      toolText: `Every idea is different and each requires unique tools. 
      A one-stop-shop has been applied to make an experience with all the 
      necessary organization you need. Need a new tool? Reach out to our 
      discord community and let us know. We'll consider your idea and 
      keep growing this platform`,
    };
  },
};
</script>

<style lang="scss" scoped>
.tool {
  width: 100%;
  height: 170px;
}
</style>
