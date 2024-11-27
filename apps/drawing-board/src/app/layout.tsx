import { Providers } from "@/app/Providers"

// import "@liveblocks/react-tiptap/styles.css"
// import "@liveblocks/react-ui/styles.css"
// import "@liveblocks/react-ui/styles/dark/media-query.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import "./styles/globals.css"
import "./styles/text-editor.css"


// import "../styles/normalize.css"
const inter = Inter( { subsets: ["latin"] } )

export const metadata: Metadata = {
  title: "Liveblocks Starter Kit",
}

export default async function RootLayout( {
  children,
}: {
  children: React.ReactNode
} ) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <Suspense>

          <Providers >


            {children}



          </Providers>
        </Suspense>

      </body>
    </html>
  )
}

