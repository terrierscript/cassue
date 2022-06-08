import { Box } from "@chakra-ui/react"
import { FC, PropsWithChildren } from "react"

export const SafeArea: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <Box
    pt={`env(safe-area-inset-top)`}
    pb={`env(safe-area-inset-bottom)`}
    pl={`env(safe-area-inset-left)`}
    pr={`env(safe-area-inset-right)`}
  >
    {children}
  </Box>
}