import { useEffect, useState } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { AppShell } from './components/AppShell';
import Overview from './pages/Overview';
import Scenarios from './pages/Scenarios';
import Simulation from './pages/Simulation';
import Learning from './pages/Learning';
import About from './pages/About';
import { readProgress } from './lib/storage';
import type { LocalProgress } from './lib/types';

function RoutedErrorBoundary({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Workspace() {
  const [progress, setProgress] = useState<LocalProgress>(() => readProgress());
  useEffect(() => {
    const sync = () => setProgress(readProgress());
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  return <AppShell><RoutedErrorBoundary><Switch>
    <Route path="/">{() => <Overview progress={progress}/>}</Route>
    <Route path="/scenarios" component={Scenarios}/>
    <Route path="/scenario/:id">{() => <Simulation onProgress={setProgress}/>}</Route>
    <Route path="/learning" component={Learning}/>
    <Route path="/about" component={About}/>
    <Route component={NotFound}/>
  </Switch></RoutedErrorBoundary></AppShell>;
}

function App() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Workspace/></WouterRouter>;
}

export default App;