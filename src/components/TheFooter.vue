<template>
  <v-footer
    color="primary lighten-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-col
        class="primary white--text"
        cols="12"
      >
        <v-container class="d-flex align-center">
          <div>Author: {{ this.$store.state.authorName }}</div>

          <v-spacer></v-spacer>

          <v-btn
            :href="this.$store.state.gitLink"
            target="_blank"
            fab
            plain
            text
            small
            dark
          >
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </v-container>
      </v-col>
      <v-col
        class="primary lighten-2 py-2 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>{{ this.$store.state.appName }}</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
