import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/database.types'
import { cookies, headers } from 'next/headers'

async function postNotionAuth(code: string) {
  const clientId = process.env.NOTION_OAUTH_CLIENT_ID
  const clientSecret = process.env.NOTION_OAUTH_CLIENT_SECRET
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI || 'http://localhost:3000/notion-list'

  // encode in base 64
  const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const response = await fetch('https://api.notion.com/v1/oauth/token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${encoded}`,
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  })

  // Check if the response is ok (status 200-299)
  if (!response.ok) {
    console.error('Failed to fetch:', response.statusText, response.status)
    return null
  }

  const data = await response.json()

  await setNotionAccessToken(data.access_token, data.workspace_id)

  return null
}

const setNotionAccessToken = async (token: string, workspaceId: string) => {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
  // サーバに保存されているセッション情報を取得
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    alert('ログインしてください')
    return
  }

  let { data: tokens, error } = await supabase.from('tokens').select('access_token')
  // トークンがすでに登録されている場合は何もしない（リロードなど）
  if (tokens && tokens?.length > 0) {
    return
  }

  const { data, error: insertError } = await supabase
    .from('tokens')
    .insert([{ access_token: token, workspace_id: workspaceId, user_id: session?.user.id }])
    .select()

  if (insertError) {
    console.error('Failed to insert:', insertError)
  }
}
export default function NotionList({ searchParams }: { searchParams: { code: string } }) {
  const notionData = postNotionAuth(searchParams.code)

  return (
    <div>
      {notionData === null ? (
        <div>未設定</div>
      ) : (
        <div>
          <p>TODO 設定されているページを表示</p>
        </div>
      )}
    </div>
  )
}
