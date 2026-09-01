import type { PropsWithChildren } from 'react'
import { ThemeToggle } from '../components/shared/ThemeToggle'
import logo from '../assets/renmeshi.svg'
import wordmark from '../assets/renmeshi letters.svg'

export function AppShell({ children }: PropsWithChildren) {
  return <div className="app-shell"><header className="topbar"><a className="brand" href="#/"><img className="brand-mark" src={logo} alt="" /><span><img className="wordmark" src={wordmark} alt="RENMESHI" /><small>Tonight's menu, sorted.</small></span></a><nav className="top-actions" aria-label="Main navigation"><a className="nav-button" href="#/backstage">Backstage ↗</a><ThemeToggle /></nav></header>{children}<footer className="footer"><img src={logo} alt="Renmeshi" /></footer></div>
}
