async function fetchSelectedPageData() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  // 選択しているページのデータを取得（現状１つだけど変更できるよう配列にしとく）
  return null
}
export default function NotionList() {
  const notionData = fetchSelectedPageData()
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
