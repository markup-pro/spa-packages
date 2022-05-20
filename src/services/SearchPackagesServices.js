import algoliasearch from 'algoliasearch'

export function searchPackages (query, page, hitsPerPage) {
  const algolia = algoliasearch(process.env.VUE_APP_ALGOLIA_ID, process.env.VUE_APP_ALGOLIA_KEY, { protocol: 'https:' })
  const index = algolia.initIndex('npm-search')
  const options = {
    page,
    hitsPerPage,
    attributesToHighlight: [],
    attributesToRetrieve: ['deprecated', 'description', 'repository', 'homepage', 'keywords', 'license', 'name', 'owner', 'version'],
    analyticsTags: ['jsdelivr']
  }

  return index.search(query, options)
}
