import { useMemo } from 'react'
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject  } from "@apollo/client";
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { onError } from '@apollo/client/link/error'
import { ApolloLink } from '@apollo/client'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

const NEXT_PUBLIC_API_SERVER_URL = process.env.NEXT_PUBLIC_API_SERVER_URL

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    console.log('graphQL', graphQLErrors)
  }
  if (networkError) {
    console.log('networkError', networkError)
  }
})

const httpLink = new HttpLink({
  uri: NEXT_PUBLIC_API_SERVER_URL , //Server URL (must be absolute)
  credentials: 'same-origin' //Additional fetch() options like 'credentials' or 'headers'
})

const link = ApolloLink.from([errorLink, httpLink])

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link,
    cache: new InMemoryCache()
  })
}

export function initializeApollo(initialState: NormalizedCacheObject | null = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(client : ApolloClient<NormalizedCacheObject>, pageProps: any) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}