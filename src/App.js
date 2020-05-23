import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ApolloProvider } from '@apollo/react-hooks'
import { ThemeProvider } from 'styled-components'
import client from './client'
import RootNavigator from './navigation/RootNavigator'
import theme from './theme'

const App = () => (
  <NavigationContainer>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <RootNavigator />
      </ThemeProvider>
    </ApolloProvider>
  </NavigationContainer>
)

export default App
