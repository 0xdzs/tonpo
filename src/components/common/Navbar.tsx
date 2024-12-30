import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="bg-[var(--tg-theme-section-bg-color)] shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo/logo_blue_transparent.png"
              alt="Tonpo"
              width={32}
              height={32}
              priority
            />
          </Link>
          <p className="text-sm text-[var(--tg-theme-subtitle-text-color)]">
            Feel the tempo of TON
          </p>
        </div>
      </div>
    </nav>
  )
} 