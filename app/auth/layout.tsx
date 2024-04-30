import { headers, cookies } from 'next/headers'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../../database.types'
import SupabaseListener from '@/app/components/supabase-listenner'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  // クライアントに持っているセッション情報をサーバに渡す
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
  // サーバに保存されているセッション情報を取得
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return (
    <>
      <SupabaseListener accessToken={session?.access_token} />
      {children}
    </>
  )
}
