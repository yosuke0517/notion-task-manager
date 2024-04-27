async function fetchSelectedPageData(code: string) {
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

  // const data = await response.json() // Parse the JSON from the response
  // console.log('Response data:', data)

  return null
}
export default function NotionList({ searchParams }: { searchParams: { code: string } }) {
  const notionData = fetchSelectedPageData(searchParams.code)

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
