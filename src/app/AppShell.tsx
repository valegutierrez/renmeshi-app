import { useState, type PropsWithChildren } from 'react'
import { ThemeToggle } from '../components/shared/ThemeToggle'
import wordmark from '../assets/renmeshi letters.svg'
import { Button, IconButton, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { recipeCategoryLinks } from '../models/about-us'

export function AppShell({ children }: PropsWithChildren) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [recipesMenuAnchor, setRecipesMenuAnchor] = useState<HTMLElement | null>(null)
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
        <IconButton className="menu-button" color="inherit" sx={{ color: 'var(--rm-ink)' }} type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}><MenuIcon /></IconButton>
        <nav id="main-navigation" className={`top-actions${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <Button component="a" className={`nav-button${isAbout ? ' is-current' : ''}`} aria-current={isAbout ? 'page' : undefined} href="#/about" onClick={() => setMenuOpen(false)}>About us</Button>
          <Button className="nav-button" aria-haspopup="menu" aria-expanded={Boolean(recipesMenuAnchor)} onClick={(event) => setRecipesMenuAnchor(event.currentTarget)}>Recipes</Button>
          <Menu anchorEl={recipesMenuAnchor} open={Boolean(recipesMenuAnchor)} onClose={() => setRecipesMenuAnchor(null)}>
            {recipeCategoryLinks.map((item) => <MenuItem component="a" href={item.href} key={item.category} onClick={() => { setRecipesMenuAnchor(null); setMenuOpen(false) }}><img className="menu-category-icon" src={item.imageSrc} alt="" />{item.label}</MenuItem>)}
          </Menu>
          <Button component="a" className="nav-button" href="#/backstage" onClick={() => setMenuOpen(false)}>Backstage</Button>
          <ThemeToggle />
        </nav>
      </header>
      {children}
      <footer className="site-footer">
        <div className="footer-inner">
          <span className="footer-logo" role="img" aria-label="Renmeshi" />
          <p>Made for the meals that make a day feel better.</p>
        </div>
      </footer>
    </div>
  )
}
