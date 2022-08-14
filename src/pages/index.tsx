import { Avatar, Box, Button, Center, Heading, HStack, IconButton, Input, Spacer, VStack } from '@chakra-ui/react'
import { ChevronRightIcon } from '@primer/octicons-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { GithubLoginButton } from '../components/layout/GithubLoginButton'

const Generate = () => {
  const router = useRouter()
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      target: ""
    }
  })
  const value = useWatch({ control })
  const destination = useMemo(() => {
    const normalized = value.target?.replace("https://", "")
      .replace("github.com/", "")
    if (normalized?.includes("/")) {
      return normalized
    }
  }, [value.target])

  return <form onSubmit={handleSubmit(((data) => {
    router.push(`/issues/${destination}`)
    return null
  }))}>
    <HStack w={{ base: "80vw", bp: "50vw" }} >
      <Input size="lg" placeholder="Input repository URL"
        textAlign={"center"}
        {...register("target")}
      />
      <Button
        size="lg"
        isDisabled={!destination}
        // href={`/${destination}`}
        p={4}
        rightIcon={<ChevronRightIcon />} aria-label={'GO'}
        type="submit"
      >
        Go
      </Button>
    </HStack>
  </form>
}


const UserOrLogin = () => {
  const session = useSession()
  if (session.status === "loading") {
    return null
  }

  if (!session.data) {
    return <Box>
      <GithubLoginButton>
        Login with Github
      </GithubLoginButton>
    </Box>
  }
  return <Box>
    <HStack>
      <Avatar size="sm" src={session.data?.user?.image ?? undefined} />
      <Box>{session.data?.user?.name}</Box>
    </HStack>
  </Box>
}

export default function Home() {
  return (
    <Box>
      <Center h="100vh" p={4}>
        <VStack>
          <Heading>Cassue</Heading>
          <Box>Chat interface issue viewer</Box>
          <Generate />
          <Box>
            <UserOrLogin />
          </Box>
        </VStack>
      </Center>
    </Box>
  )
}
