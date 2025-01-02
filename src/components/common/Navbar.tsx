import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export default function Navbar() {
  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    )}>
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src="/logo/logo_blue_transparent.png"
              alt="Tonpo"
              width={32}
              height={32}
              priority
              className="rounded-lg"
            />
            <span className="hidden font-bold sm:inline-block">
              Tonpo
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <p className="text-sm text-muted-foreground">
            Feel the tempo of TON
          </p>
        </div>
      </div>
    </nav>
  )
}