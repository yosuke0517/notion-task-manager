import { Database } from '@/database.types'

type Note = Database['public']['Tables']['notes']['Row']

async function fetchNotes() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const res = await fetch(`${process.env.SUPABASE_PROJECT_URL}/rest/v1/notes?select=*`, {
    headers: new Headers({
      apikey: process.env.SUPABASE_API_KEY as string,
    }),
    cache: 'no-store',
    //next: { revalidate: 10 },
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data in server')
  }
  const notes: Note[] = await res.json()
  return notes
}

export default async function PageList() {
  const notes = await fetchNotes()
  return (
    <div>
      <p className='my-4 pb-3 text-xl font-medium underline underline-offset-4'>Notes</p>
      <ul className='m-3'>
        {notes.map((note) => (
          <li key={note.id}>
            <p> {note.title}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
