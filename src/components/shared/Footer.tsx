import type { ReactNode } from 'react'
import './index.css'

const currentYear = new Date().getFullYear()
interface FooterProps {
  children?: ReactNode
}

export default function Footer({ children }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p>&copy; {currentYear} Events Management System. All rights reserved.</p>
        {children ? <div className="footer__meta">{children}</div> : null}
      </div>
    </footer>
  )
}
