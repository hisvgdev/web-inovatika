export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-[80vh] overscroll-none flex items-center justify-center">{children}</div>
    )
}
