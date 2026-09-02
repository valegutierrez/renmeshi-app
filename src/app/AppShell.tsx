import { useState, type PropsWithChildren } from 'react'
import { ThemeToggle } from '../components/shared/ThemeToggle'
import logo from '../assets/renmeshi.svg'
import wordmark from '../assets/renmeshi letters.svg'

export function AppShell({ children }: PropsWithChildren) {
  const [menuOpen, setMenuOpen] = useState(false)
  const isAbout = window.location.hash === '#/about'
  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#/" onClick={() => setMenuOpen(false)}>
          <span>
            <img className="wordmark" src={wordmark} alt="RENMESHI" />
            <small>Tonight's menu, sorted.</small>
          </span>
        </a>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}>Menu</button>
        <nav id="main-navigation" className={`top-actions${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <a className={`nav-button${isAbout ? ' is-current' : ''}`} aria-current={isAbout ? 'page' : undefined} href="#/about" onClick={() => setMenuOpen(false)}>About us</a>
          <a className="nav-button" href="#/" onClick={() => setMenuOpen(false)}>Recipes</a>
          <a className="nav-button" href="#/backstage" onClick={() => setMenuOpen(false)}>Backstage ↗</a>
          <ThemeToggle />
        </nav>
      </header>
      {children}
      <footer className="site-footer">
        <div className="footer-inner">
          <img src={logo} alt="Renmeshi" />
          <p>Made for the meals that make a day feel better.</p>
        </div>
      </footer>
    </div>
  )
}
