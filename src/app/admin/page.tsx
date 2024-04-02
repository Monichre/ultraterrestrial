import AuthButton from '@/components/AuthButton'
import DeployButton from '@/components/DeployButton'
import Header from '@/components/ui/header/admin-header'
import FetchDataSteps from '@/components/tutorial/FetchDataSteps'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Dashboard } from '@/components/dashboard'

export default async function AdminPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  return (
    <div className='flex-1 w-full flex flex-col gap-20 items-center'>
      <div className='w-full'>
        <Header />
        {/* <AuthButton /> */}
        {/* 
        <nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
          <div className='w-full max-w-4xl flex justify-between items-center p-3 text-sm'>
            Admin
            <AuthButton />
          </div>
        </nav> */}
      </div>
      <Dashboard />
    </div>
  )
}
