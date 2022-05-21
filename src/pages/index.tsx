import { Box, Button, Center, HStack, IconButton, Input } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@heroicons/react/outline'

const Generate = () => {
  const [value, setValue] = useState("")
  const destination = useMemo(() => {
    const normalized = value
      .replace("https://", "")
      .replace("github.com/", "")
    if (normalized.includes("/")) {
      return normalized
    }
    return null
  }, [value])
  return <HStack w={"90vw"}>
    <Input value={value} placeholder="Input repository URL" textAlign={"center"} onChange={(e) => setValue(e.target.value)} />
    <IconButton as="a"
      isDisabled={destination === null}
      href={`/${destination}`}
      p={2} icon={<ArrowCircleRightIcon />} aria-label={'GO'}
      colorScheme="blue"
    />
  </HStack>
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
