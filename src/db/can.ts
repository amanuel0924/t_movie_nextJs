import { createContext } from "react"
import { createContextualCan } from "@casl/react"
// @ts-ignore
export const AbilityContext = createContext() // Provide a default value of null
// @ts-ignore
export const Can = createContextualCan(AbilityContext.Consumer)
