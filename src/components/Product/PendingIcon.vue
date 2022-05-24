<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-icon color="primary" dark v-bind="attrs" v-on="on"> mdi-update </v-icon>
    </template>
    <span>Pending Product Update</span>
  </v-tooltip>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
