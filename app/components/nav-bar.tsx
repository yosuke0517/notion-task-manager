import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className='fixed flex items-center justify-between p-4'>
      <Link href='/' className='rounded'>
        Home
      </Link>
    </nav>
  )
}
