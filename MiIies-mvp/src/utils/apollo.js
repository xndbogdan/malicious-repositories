import { InMemoryCache, ApolloClient } from '@apollo/client'
import { useMemo } from 'react';
export function createApolloClient(ssrMode) {
  return new ApolloClient({
    ssrMode,
    uri: process.env.REACT_APP_SUBGRAPH,
    cache: new InMemoryCache(),
  });
}

export function useApollo() {
  return useMemo(() => createApolloClient(false), []);
}