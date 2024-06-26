// "use client"
// import { AbilityContext } from "@/db/can"
// import { useSession } from "next-auth/react"
// import { subject } from "@casl/ability"
// import { AppAbility, defineAbilitiesFor } from "@/db/reactCasl"
// import { useEffect, useState } from "react"

// export default function AbilityContextProvider({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const session = useSession()

//    const ability = buildAbility(session.data?.user)
//   const [ability, setAbility] = useState<any>()

//   useEffect(() => {
//     const getAbility = async () => {
//       const abilities = await defineAbilitiesFor(
//         session.data?.user.roleId as number,
//         session.data?.user.id as string
//       )
//       console.log(abilities.rules, "abilities")
//       setAbility(abilities)
//     }
//     getAbility()
//   }, [session.data?.user.roleId, session.data?.user.id])
//   return (
//     <AbilityContext.Provider value={ability}>
//       {children}
//     </AbilityContext.Provider>
//   )
// }
