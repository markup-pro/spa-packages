<template>
  <v-app>
    <TheNavbar />
    <v-main>
      <slot />
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
import TheFooter from '@/components/TheFooter'

export default {
  name: 'HomeLayout',

  components: {
    TheNavbar,
    TheFooter
  }
}
</script>
