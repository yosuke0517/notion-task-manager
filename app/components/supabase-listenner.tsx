'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '../../utils/supabase'
import useStore from '../../store'

/** セッション情報を監視・管理するコンポーネント */
export default function SupabaseListener({ accessToken }: { accessToken?: string }) {
  const router = useRouter()
  const { updateLoginUser } = useStore()
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        updateLoginUser({
          id: data.session?.user.id,
          email: data.session?.user.email!,
        })
      }
    }
    getUserInfo()
    // セッション情報を監視
    supabase.auth.onAuthStateChange((_, session) => {
      updateLoginUser({ id: session?.user.id, email: session?.user.email! })
      // NOTE: ここでサーバサイドのセッション情報とクライアントサイドのセッション情報を比較し異なる場合はリフレッシュ
      if (session?.access_token !== accessToken) {
        router.refresh()
      }
    })
  }, [accessToken])
  return null
}
