import { Box, Center } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import { LoginButton } from '../components/Login'

export default function Home() {
  return (
    <Box>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center>

      </Center>
      <LoginButton />
    </Box>
  )
}
