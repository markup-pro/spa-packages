import Vue from 'vue'
import Vuex from 'vuex'
import { searchPackages } from '@/services/SearchPackagesServices'
import { versionPackages, filesPackages } from '@/services/PackagesServices'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appName: 'JSdelivr',
    authorName: 'Plut Oleksandr',
    gitLink: 'https://github.com/markup-pro',
    packages: {
      hits: []
    },
    packageVersion: null,
    packageVersionSelect: null,
    packageFiles: null
  },
  getters: {
    package: (state) => (name) => {
      return state.packages.hits.find(el => el.name === name)
    }
  },
  mutations: {
    setTopPackages (state, payload) {
      state.topPackages = payload
    },

    setSearchPackages (state, payload) {
      state.packages = payload
    },

    clearSearchPackages (state) {
      state.packages = { hits: [] }
    },

    setVersionsPackage (state, payload) {
      state.packageVersion = payload.versions
      state.packageVersionSelect = payload.versions[0]
    },

    setFilesPackage (state, payload) {
      state.packageFiles = payload
    },

    updateSelect (state, payload) {
      state.packageVersionSelect = payload
    },

    clearModalDetail (state) {
      state.packageVersion = null
      state.packageVersionSelect = null
      state.packageFiles = null
    }
  },
  actions: {
    async searchPackages (context, payload) {
      const { query, page, hitsPerPage } = payload
      await searchPackages(query, page, hitsPerPage).then(response => {
        context.commit('setSearchPackages', response)
      }).catch(error => {
        console.warn(error)
      })
    },

    async versionsPackage (context, payload) {
      await versionPackages(payload).then(response => {
        context.commit('setVersionsPackage', response)
      }).catch(error => {
        console.warn(error)
      })
    },

    async filesPackage (context, payload) {
      await filesPackages(payload, context.state.packageVersionSelect).then(response => {
        context.commit('setFilesPackage', response.files)
      }).catch(error => {
        console.warn(error)
      })
    }
  }
})
