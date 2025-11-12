import type { ReactNode } from 'react'
const currentYear = new Date().getFullYear()
interface FooterProps {
  children?: ReactNode
}

export default function Footer({ children }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-2 px-6 py-4 text-center text-sm text-slate-500">
        <p>&copy; {currentYear} Events Management System. All rights reserved.</p>
        {children ? <div className="text-slate-400">{children}</div> : null}
      </div>
    </footer>
  )
}
