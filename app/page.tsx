import Image from 'next/image'
import { Metadata } from 'next'
import PageList from '@/app/components/page-list'

export const metadata: Metadata = {
  title: 'hoge',
  description: 'hoge fuga',
}

export default function Home() {
  const authUrl = process.env.NEXT_PUBLIC_NOTION_AUTH_URL
  const clientId = process.env.NOTION_OAUTH_CLIENT_ID // サーバサイドでのみ利用可能
  const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_REDIRECT_URI || '')

  const notionUrl = `${authUrl}?client_id=${clientId}&response_type=code&owner=user&redirect_uri=${redirectUri}`

  return (
    <main className='flex flex-col items-center justify-between p-24'>
      <div>
        <a href={notionUrl}>Add to Notion</a>
        <PageList />
      </div>
    </main>
  )
}
