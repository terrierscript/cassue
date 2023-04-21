import { FC, PropsWithChildren } from "react"
import { SWRConfig } from "swr"
import { localStorageProvider } from "./localstorageCache"

export const AppSWRPRovider: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <SWRConfig value={{
    provider: localStorageProvider
  }}>
    {children}
  </SWRConfig>
}