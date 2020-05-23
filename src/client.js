import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import AsyncStorage from '@react-native-community/async-storage'
import config from './config'

const httpLink = new HttpLink({
  uri: config.graphqlUrl,
  credentials: 'include',
})

const afterwareLink = new ApolloLink((operation, forward) => forward(operation)
  .map(response => {
    const { response: { headers } } = operation.getContext()
    const token = headers.get('x-token')

    if (token) {
      AsyncStorage.setItem('token', token)
    }

    return response
  }))

const middlewareLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token')

  const newHeaders = token
    ? {
      ...headers,
      authorization: `Bearer ${token}`,
    } : {
      ...headers,
    }

  return {
    headers: newHeaders,
  }
})

const errorLink = onError(() => {
  // Handle specific errors here
  //   e.g. redirect to login on AuthenticationError
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    afterwareLink,
    middlewareLink,
    errorLink,
    httpLink,
  ]),
})

export default client
