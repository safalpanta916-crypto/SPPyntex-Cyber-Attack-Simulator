import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return <div className="content"><div className="panel" style={{padding:30,maxWidth:570,margin:'10vh auto'}}><div className="eyebrow">SPPyntex / Not found</div><h1 className="page-title">This page isn’t in the lab.</h1><p className="page-description">The address may have changed. Choose a known area to continue.</p><Link href="/" className="button" style={{marginTop:18}}><ArrowLeft/>Back to overview</Link></div></div>;
}
