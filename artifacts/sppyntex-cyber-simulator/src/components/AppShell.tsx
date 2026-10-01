import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { BookOpen, ChevronRight, CircleHelp, LayoutDashboard, LockKeyhole, Menu, Network, ShieldCheck, ShieldAlert, Mail, KeyRound, Repeat2, Database, type LucideIcon } from 'lucide-react';
import { scenarios } from '../data/scenarios';
import sppyntexLogo from '../../../../attached_assets/sppyntexlogo_1790862540819.jpg';

const iconMap = { mail: Mail, 'key-round': KeyRound, 'repeat-2': Repeat2, network: Network, database: Database, 'shield-alert': ShieldAlert } as const;

export function ScenarioIcon({ name }: { name: string }) {
  const Icon = iconMap[name as keyof typeof iconMap] ?? ShieldCheck;
  return <Icon aria-hidden="true" />;
}

export function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const isScenarioArea = location === '/scenarios' || location.startsWith('/scenario/');
  const navItem = (href: string, label: string, Icon: LucideIcon, active: boolean) => (
    <Link href={href} onClick={closeMenu} className={`nav-link${active ? ' active' : ''}`} data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>
      <Icon aria-hidden="true" /><span>{label}</span>
    </Link>
  );
  return <div className="app-shell">
    <div className={`mobile-overlay${menuOpen ? ' visible' : ''}`} onClick={closeMenu} aria-hidden="true" />
    <aside className={`sidebar${menuOpen ? ' open' : ''}`}>
      <div className="brand"><img className="brand-mark brand-image" src={sppyntexLogo} alt="SPPyntex logo"/><div className="brand-copy"><strong>SPPyntex</strong><span>SECURITY LAB</span></div></div>
      <div className="nav-label">Workspace</div>
      <nav className="nav-list" aria-label="Main navigation">
        {navItem('/', 'Overview', LayoutDashboard, location === '/')}
        {navItem('/scenarios', 'Attack Simulator', ShieldCheck, isScenarioArea)}
        {isScenarioArea && <div className="scenario-subnav">
          {scenarios.map(s => <Link key={s.id} href={`/scenario/${s.id}`} onClick={closeMenu} className={`nav-link${location === `/scenario/${s.id}` ? ' active' : ''}`} data-testid={`link-scenario-${s.id}`}><ScenarioIcon name={s.icon}/><span>{s.title}</span></Link>)}
        </div>}
      </nav>
      <div className="nav-label">Learning</div>
      <nav className="nav-list">
        {navItem('/learning', 'Concepts & defenses', BookOpen, location === '/learning')}
      </nav>
      <div className="nav-label">About</div>
      <nav className="nav-list">
        {navItem('/about', 'About the simulator', CircleHelp, location === '/about')}
      </nav>
      <div className="sidebar-bottom">
        <div className="safety-note"><strong><LockKeyhole size={13}/> Safe by design</strong>Scenarios are fictional. Nothing connects to real systems.</div>
        <div className="creator-mini"><div className="creator-avatar">SP</div><span>Safal Panta<small>Creator · SPPyntex</small></span></div>
      </div>
    </aside>
    <main className="main-area">
      <div className="mobile-head">
        <button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open navigation" data-testid="button-open-menu"><Menu /></button>
        <div className="mobile-logo"><img className="brand-mark brand-image" src={sppyntexLogo} alt="SPPyntex logo"/>SPPyntex Lab</div>
        <Link href="/about" onClick={closeMenu} className="mobile-menu" aria-label="About the simulator" data-testid="link-mobile-about"><CircleHelp /></Link>
      </div>
      <div className="topbar"><div className="topbar-location"><span>SPPyntex /</span><b>{location === '/' ? 'Overview' : location.startsWith('/scenario') ? 'Simulation' : location === '/scenarios' ? 'Attack Simulator' : location === '/about' ? 'Field notes' : 'Learning'}</b></div><div className="topbar-right"><span className="status-dot"/><span>LOCAL LEARNING LAB</span><ChevronRight size={12}/></div></div>
      {children}
      <footer className="footer"><div className="footer-brand"><img src={sppyntexLogo} alt="SPPyntex logo"/><span><strong>SPPyntex Cyber Attack Simulator</strong><span> · Built & designed by Safal Panta</span></span></div><div className="footer-links"><a href="https://github.com/safalpanta916-crypto" target="_blank" rel="noopener noreferrer">GitHub</a><a href="https://www.linkedin.com/in/safal-panta-a69958415/" target="_blank" rel="noopener noreferrer">LinkedIn</a><Link href="/about">About</Link></div></footer>
    </main>
  </div>;
}