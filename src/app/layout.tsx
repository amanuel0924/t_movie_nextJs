import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ThemeRegistery from "./theme/ThemeRegistery"
import SesstionProvider from "@/utils/SessionProvider"
import { getServerSession } from "next-auth"
// import AblityProvider from "@/utils/AblityContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <SesstionProvider session={session}>
        {/* <AblityProvider> */}
        <ThemeRegistery>
          <body className={inter.className}>{children}</body>
        </ThemeRegistery>
        {/* </AblityProvider> */}
      </SesstionProvider>
    </html>
  )
}
