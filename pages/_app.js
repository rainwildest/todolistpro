import React from 'react'
import NextApp from 'next/app'
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'

class App extends NextApp {
  render () {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider>
        <CSSReset />
        <ColorModeProvider value='light'>
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    )
  }
}

export default App
