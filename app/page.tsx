import { redirect } from 'next/navigation'

export default function Home() {
    redirect('/programs')
    return null
}
