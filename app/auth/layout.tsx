export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="overscroll-none overflow-hidden flex items-center justify-center w-full">
            {children}
        </div>
    )
}
