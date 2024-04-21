import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className='flex items-center justify-between p-4'>
      <Link href='/' className='rounded'>
        Home
      </Link>
    </nav>
  )
}
