import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-[var(--tg-theme-section-bg-color)] shadow">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl text-[var(--tg-theme-accent-text-color)]">
            Tonpo 📊
          </Link>
          <p className="text-sm text-[var(--tg-theme-subtitle-text-color)]">
            Feel the tempo of TON
          </p>
        </div>
      </div>
    </nav>
  )
} 