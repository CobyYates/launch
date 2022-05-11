<template>
  <h3 class="grey--text font-weight-medium">{{ title }}</h3>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>