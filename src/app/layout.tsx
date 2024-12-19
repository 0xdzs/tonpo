import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/common/Navbar'
import BackToTop from '@/components/common/BackToTop'
import TelegramOnly from '@/components/TelegramOnly'
import TelegramScript from '@/components/common/TelegramScript'

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
      <head>
        <TelegramScript />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={`${inter.className} safe-area-inset`}>
        <TelegramOnly>
          <div className="pt-safe">
            <Navbar />
            <main className="container mx-auto px-4 py-4">
              {children}
            </main>
          </div>
        </TelegramOnly>
        <BackToTop />
      </body>
    </html>
  )
} 