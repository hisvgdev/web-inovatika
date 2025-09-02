import { JSX } from 'react'
import { FaInfoCircle, FaShoppingBag, FaTv, FaUser } from 'react-icons/fa'

interface NavItem {
    label: string
    icon: JSX.Element
    active?: boolean
    href: string
}

export const navItems: NavItem[] = [
    { label: 'Программы', icon: <FaTv />, href: '/home' },
    { label: 'О сервисе', icon: <FaInfoCircle />, href: '/about-service' },
    { label: 'Подписка', icon: <FaShoppingBag />, href: '/subscription' },
    { label: 'Аккаунт', icon: <FaUser />, href: '/account' },
]
