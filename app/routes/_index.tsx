import { Button } from '@/components/ui/button'
import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }]
}

export default function Index() {
  return (
    <div
      className="min-h-screen flex flex-col flex-1"
      style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}
    >
      <h1 className="text-lg font-bold">PMS</h1>
      <ul>
        <li>
          <Button asChild variant="link">
            <Link to="meters">Meters</Link>
          </Button>
        </li>
      </ul>
    </div>
  )
}
