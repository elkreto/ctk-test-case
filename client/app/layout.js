import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/footer'
import { Navbar } from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next App',
  description: 'Made by SP',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar></Navbar>
        <main className="flex min-h-screen flex-col p-5 items-center justify-between">{children}</main>
        <Footer></Footer>
      </body>
    </html>
  )
}
