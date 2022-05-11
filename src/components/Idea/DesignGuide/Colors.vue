<template>
  <v-col cols="auto">
    <h3 class="mb-0">{{ title }}</h3>
    <div class="d-flex flex-wrap">
      <v-menu
        v-for="c in colors"
        :key="c.i"
        :close-on-content-click="false"
        v-model="c.menu"
        offset-y
        absolute
        @input="update(c.menu)"
      >
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex flex-column">
            <v-card
              flat
              color="transparent"
              height="auto"
              width="130"
              class="mr-5"
              tile
            >
              <v-avatar
                width="100%"
                tile
                height="75"
                v-on="on"
                :color="c.color"
                v-bind="attrs"
              />
              <v-text-field
                background-color="transparent"
                v-model="c.label"
                @blur="updateLabel"
                class="px-0 my-2"
                hide-details
                outlined
                dense
                flat
              />
              <p class="font-weight-bold mb-0">{{ c.color.toUpperCase() }}</p>
            </v-card>
          </div>
        </template>
        <v-color-picker v-model="c.color" mode="hexa" />
      </v-menu>
    </div>
  </v-col>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    colors: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    update(menu) {
      if (menu == false) {
        this.$emit("update");
      }
    },
    updateLabel() {
      this.$emit("update");
    }
  },
};
</script>

<style lang="scss" scoped></style>
