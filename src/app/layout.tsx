import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/common/Navbar'
import BackToTop from '@/components/common/BackToTop'
import TelegramOnly from '@/components/TelegramOnly'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tonpo 📊',
  description: 'Track the tempo of TON ecosystem for better trading decisions 📈',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TelegramOnly>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </TelegramOnly>
        <BackToTop />
      </body>
    </html>
  )
} 