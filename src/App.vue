<template>
  <HomeLayout>
    <v-container>
      <v-row>
        <v-col md="8" offset-md="2">
          <PackagesSearch />
        </v-col>
      </v-row>
    </v-container>
  </HomeLayout>
</template>

<script>
import HomeLayout from '@/layout/HomeLayout'
import PackagesSearch from '@/components/packages/PackagesSearch'

export default {
  name: 'HomeView',

  components: { HomeLayout, PackagesSearch }
}
</script>
