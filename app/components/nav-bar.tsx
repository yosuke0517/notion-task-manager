'use client'
import Link from 'next/link'
import supabase from '@/utils/supabase'
import { useRouter } from 'next/navigation'
import useStore from '@/store'

export default function NavBar() {
  const router = useRouter()
  const { loginUser } = useStore()
  const signOut = () => {
    supabase.auth.signOut()
    router.push('/auth')
  }

  return (
    <nav className='fixed flex items-center justify-between p-4 gap-4'>
      <Link href='/' className='rounded'>
        Home
      </Link>
      {loginUser.id && (
        <button className='my-6 h-6 cursor-pointer ' onClick={signOut}>
          ログアウト
        </button>
      )}
    </nav>
  )
}
