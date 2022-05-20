<template>
  <v-card>
    <v-toolbar
      flat
      dark
      color="primary"
      class="mb-5"
    >
      <v-toolbar-title>{{ data.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        dark
        @click="$emit('close')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text v-if="data" class="text--primary text-md-body-1">
      <div class="d-flex mb-5">
        <div class="d-flex align-center">
          <v-avatar size="30" class="mr-2">
            <img
              :src="data.owner.avatar"
              :alt="data.owner.name"
            >
          </v-avatar>
          <span>{{ data.owner.name }}</span>
        </div>
        <v-spacer></v-spacer>
        <div>
          <v-btn
            v-if="data.homepage"
            icon
            outlined
            tile
            link
            :href="data.homepage"
            target="_blank"
            class="ml-1"
          >
            <v-icon dark>
              mdi-earth
            </v-icon>
          </v-btn>
          <v-btn
            v-if="data.repository"
            icon
            outlined
            tile
            link
            :href="data.repository.url"
            target="_blank"
            class="ml-1"
          >
            <v-icon dark>
              mdi-github
            </v-icon>
          </v-btn>
          <v-btn
            icon
            outlined
            tile
            link
            :href="'https://www.npmjs.com/package/' + data.name"
            target="_blank"
            class="ml-1"
          >
            <v-icon dark>
              mdi-npm
            </v-icon>
          </v-btn>
        </div>
      </div>
      <v-chip-group class="mb-3">
        <v-chip
          label
          outlined
        >
          <v-icon left small>
            mdi-tag
          </v-icon>
          {{ data.version }}
        </v-chip>
        <v-chip
          label
          outlined
        >
          <v-icon left small>
            mdi-scale-balance
          </v-icon>
          {{ data.license }}
        </v-chip>
      </v-chip-group>
      <p v-html="data.description" />
      <v-chip-group
        column
        class="mb-3"
      >
        <v-chip
          v-for="item in data.keywords"
          :key="item"
          label
          outlined
        >
          {{ item }}
        </v-chip>
      </v-chip-group>
      <v-card :loading="loading">
        <v-toolbar
          height="auto"
          flat
          color="white"
          class="pt-3 pb-4"
        >
          <v-row class="align-center">
            <v-col cols="12" sm="8">
              <strong>{{ data.name }}</strong>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                :disabled="loading"
                :value="packageVersionSelect"
                :items="packageVersion"
                dense
                hide-details
                @change="selectChange"
              />
            </v-col>
          </v-row>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text v-if="data" class="text--primary text-md-body-1">
          <div class="d-flex align-center"
               v-for="item in packageFiles"
               :key="item.name">
            <v-icon small class="mr-2">{{ item.type === 'file' ? 'mdi-file' : 'mdi-folder' }}</v-icon>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </div>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CardPackage',

  props: {
    data: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },

  data: () => ({
    loading: false
  }),

  computed: {
    ...mapState(['packageVersion', 'packageVersionSelect', 'packageFiles'])
  },

  created () {
    this.getPackageVersion()
  },

  beforeDestroy () {
    this.$store.commit('clearModalDetail')
  },

  methods: {
    /**
     * Select change packages version
     * @param {string} value - Current select value.
     */
    selectChange (value) {
      this.$store.commit('updateSelect', value)
      this.getFilesPackages()
    },

    /**
     * Request to get package versions
     */
    async getPackageVersion () {
      this.loading = true
      await this.$store.dispatch('versionsPackage', this.data.name)
      await this.$store.dispatch('filesPackage', this.data.name)
      this.loading = false
    },

    /**
     * Request to get package files
     */
    async getFilesPackages () {
      this.loading = true
      await this.$store.dispatch('filesPackage', this.data.name)
      this.loading = false
    }
  }
}
</script>
