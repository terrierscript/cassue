import { Box, Center, HStack, IconButton, Input } from '@chakra-ui/react'
import { ChevronRightIcon } from '@primer/octicons-react'
import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

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
      <IconButton as="a"
        size="lg"
        isDisabled={!destination}
        // href={`/${destination}`}
        p={2} icon={<ChevronRightIcon />} aria-label={'GO'}
        type="submit"
      />

    </HStack>
  </form>
}


export default function Home() {
  return (
    <Box>
      <Center h="100vh" p={4}>
        <Generate />
      </Center>
    </Box>
  )
}
