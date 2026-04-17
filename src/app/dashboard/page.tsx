import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '@/app/auth/action'

export default async function DashboardPage() {
  const supabase = await createClient()

  // always use getUser() — never getSession() on server
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // fetch user's data server-side, RLS applied automatically
  const { data: invitation } = await supabase
    .from('invitations')
    .select('*')
    .single()

  return (
    <div>
      <p>Hello, {user.email}</p>

      {invitation
        ? <p>Your invitation: {invitation.title}</p>
        : <p>No invitation yet.</p>
      }

      <form action={signOut}>
        <button type="submit">Sign out</button>
      </form>
    </div>
  )
}