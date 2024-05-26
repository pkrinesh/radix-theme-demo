import Dashboard from '@/components/radix-dashboard'
import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [{ title: 'Radix Theme' }, { name: 'description', content: 'Welcome radix theme crm!' }]
}

export default function Index() {
  return <Dashboard />
}
