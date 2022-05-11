<template>
  <v-row class="justify-center">
    <v-col cols="11">
      <v-row class="my-16 justify-center">
        <v-col cols="11" md="6" class="px-10 d-flex align-center">
          <div
            class="mb-16"
            :class="$vuetify.breakpoint.mdAndUp ? '' : 'text-center'"
          >
            <h2 class="display-1 mb-5 black--text">A PLACE FOR EVERYTHING</h2>
            <p class="title font-weight-light black--text">{{ placeText }}</p>
            <v-btn
              color="purple darken-2"
              outlined
              x-large
              tile
              elevation="3"
              to="/login"
            >
              START IDEATING
            </v-btn>
          </div>
        </v-col>
        <v-col cols="11" md="6" class="mx-auto">
          <v-img :src="require('../../assets/DesktopMobile.png')" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      placeText: `Planning out a business idea has been simplified and organized.
         There is a place for it all including  possible names for you idea,
          creating tasks or keeping track of your social handles. New 
          features and capabilities will continue to be added.`,
    };
  },
};
</script>

<style lang="scss" scoped></style>
