import { createContext, lazy, Suspense, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import './App.css'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const PmbPage = lazy(() => import('./pages/PmbPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

export const ThemeContext = createContext({ theme: 'terang', toggleTheme: () => {} })
export type Registrant = { id: string; name: string; program: string }
type RegistrantAction = { type: 'add'; registrant: Registrant }
function registrantsReducer(registrants: Registrant[], action: RegistrantAction) {
  return action.type === 'add' ? [...registrants, action.registrant] : registrants
}
export const RegistrantsContext = createContext<{ registrants: Registrant[]; addRegistrant: (registrant: Registrant) => void }>({ registrants: [], addRegistrant: () => {} })

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Ganti tema warna">{theme === 'terang' ? 'Gelap' : 'Terang'}</button>
}

const pages = {
  '/': { label: 'Home', component: HomePage },
  '/about': { label: 'About', component: AboutPage },
  '/pmb': { label: 'PMB', component: PmbPage },
  '/contact': { label: 'Contact', component: ContactPage },
} as const

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [theme, setTheme] = useState<'terang' | 'gelap'>('terang')
  const [registrants, dispatchRegistrant] = useReducer(registrantsReducer, [], () => {
    try { return JSON.parse(localStorage.getItem('upi-yptk-registrants') ?? '[]') as Registrant[] }
    catch { return [] }
  })

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    try { localStorage.setItem('upi-yptk-registrants', JSON.stringify(registrants)) }
    catch { /* Penyimpanan browser mungkin dinonaktifkan. */ }
  }, [registrants])

  const navigate = useCallback((event: React.MouseEvent<HTMLAnchorElement>, destination: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    window.history.pushState({}, '', destination)
    setPath(destination)
    window.scrollTo(0, 0)
  }, [])

  const themeValue = useMemo(() => ({ theme, toggleTheme: () => setTheme((current) => current === 'terang' ? 'gelap' : 'terang') }), [theme])
  const registrantsValue = useMemo(() => ({ registrants, addRegistrant: (registrant: Registrant) => dispatchRegistrant({ type: 'add', registrant }) }), [registrants])

  const currentPage = pages[path as keyof typeof pages] ?? pages['/']
  const Page = currentPage.component

  return (
    <ThemeContext.Provider value={themeValue}>
    <RegistrantsContext.Provider value={registrantsValue}>
    <div className={`site-shell theme-${theme}`}>
      <header className="site-header">
        <a className="brand" href="/" onClick={(event) => navigate(event, '/')}>UPI <span>YPTK</span></a>
        <nav className="site-nav" aria-label="Navigasi utama">
          {Object.entries(pages).map(([href, page]) => (
            <a key={href} href={href} aria-current={path === href ? 'page' : undefined} onClick={(event) => navigate(event, href)}>{page.label}</a>
          ))}
          <ThemeToggle />
        </nav>
      </header>
      <Suspense fallback={<main className="loading" aria-live="polite">Memuat halaman…</main>}>
        <Page />
      </Suspense>
      <footer className="site-footer">© 2026 UPI YPTK Padang</footer>
    </div>
    </RegistrantsContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App
