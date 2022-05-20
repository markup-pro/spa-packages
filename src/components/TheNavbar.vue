<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <v-container>
      <h1>{{ this.$store.state.appName }}</h1>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'TheNavbar'
}
</script>
