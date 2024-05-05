import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareSupabaseClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()
  /** NOTE: faviconとか静的アセットも入ってきてしまうので、個別でパスだけ設定する必要がある
   * ここでリダイレクトを設定すると、faviconとかのリクエストもリダイレクトされて、cssが効かなかったりする
   * 他に方法ありそうだけど、とりあえずこれで。
   */
  if (!session && req.nextUrl.pathname === '/') {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/auth'
    return NextResponse.redirect(redirectUrl)
  }
  return res
}
