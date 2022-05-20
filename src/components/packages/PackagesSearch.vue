<template>
  <div class="pt-10">
    <v-text-field
      label="search all of npm"
      prepend-inner-icon="mdi-magnify"
      hide-details
      solo
      light
      class="mb-5"
      :value="query"
      :loading="loading"
      @input="debounceInput($event)"
    />
    <div v-if="packages.hits.length > 0" key="table">
      <v-data-table
        :headers="headers"
        :items="packages.hits"
        hide-default-footer
        loading-text="Loading... Please wait"
        class="elevation-1 mb-5"
        @click:row="clickRow"
      >
        <template v-slot:item.owner="{ item }">
          {{ item.owner.name }}
        </template>
      </v-data-table>
      <v-pagination
        v-model="page"
        :length="packages.nbPages"
        :total-visible="6"
        @input="debouncePagination"
      />
    </div>
    <Transition name="fade">
      <div v-if="packages.hits.length === 0 && packages.query" key="text">No results founds</div>
    </Transition>

    <v-dialog
      v-model="dialog"
      width="800"
    >
      <CardPackage
        v-if="dialog"
        :data="packageInfo"
        @close="dialog = false"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import debounce from 'debounce'

import CardPackage from '@/components/card/CardPackage'

export default {
  name: 'SearchPackages',

  components: { CardPackage },

  data: () => ({
    query: '',
    page: 1,
    hitsPerPage: 10,
    packageInfo: {},
    dialog: false,
    loading: false,
    headers: [
      {
        text: 'Name',
        value: 'name',
        sortable: false
      },
      {
        text: 'Owner',
        value: 'owner',
        sortable: false
      },
      {
        text: 'Version',
        value: 'version',
        sortable: false
      }
    ]
  }),

  computed: {
    ...mapState(['packages'])
  },

  mounted () {
    this.getQuery()
  },

  methods: {
    /**
     * Get query parameters url
     */
    getQuery () {
      if (this.$route.query.query) {
        const { query, page } = this.$route.query
        this.query = query
        this.page = Number(page ?? 1)
        this.searchPackages()
      }
    },

    /**
     * Set query parameters url
     */
    setQuery () {
      const query = {
        query: this.query || undefined,
        page: this.page > 1 ? this.page : undefined
      }
      this.$router.replace({ query })
    },

    /**
     * Change input search
     *  @param {string} e - input value.
     */
    debounceInput: debounce(function (e) {
      this.query = e
      this.page = 1
      this.setQuery()
      this.searchPackages()
    }, 200),

    /**
     * Change current page
     * @param {number} page - Current page.
     */
    debouncePagination: debounce(function (page) {
      this.page = page
      this.setQuery()
      this.searchPackages()
    }, 200),

    /**
     * Sending a package search request
     */
    async searchPackages () {
      if (this.query) {
        const options = {
          query: this.query,
          page: this.page - 1,
          hitsPerPage: this.hitsPerPage
        }
        this.loading = true
        await this.$store.dispatch('searchPackages', options)
        this.loading = false
      } else {
        this.$store.commit('clearSearchPackages')
      }
    },

    /**
     * Click table row
     * @param {object} item - Current row table dada.
     */
    clickRow (item) {
      this.packageInfo = this.$store.getters.package(item.name)
      this.dialog = true
    }
  }
}
</script>

<style lang="scss">
.v-data-table {
  td.text-start {
    width: 30%;

    &:first-child {
      width: 40%;
    }
  }
}
</style>
