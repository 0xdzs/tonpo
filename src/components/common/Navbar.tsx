import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-[var(--tg-theme-section-bg-color)] shadow">
      <div className="container mx-auto px-12">
        <div className="flex flex-col items-center py-6">
          <Link href="/" className="font-bold text-xl text-[var(--tg-theme-accent-text-color)] mb-2">
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