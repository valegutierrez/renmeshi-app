import { useState } from 'react'
import { signInWithServer } from '../../services/api'

export function SignInPage({ onSignedIn }: { onSignedIn: () => void }) {
  const [name, setName] = useState('demo-admin')
  const [password, setPassword] = useState('renmeshi-demo')
  const [error, setError] = useState('')
  return <section className="detail-panel" style={{ maxWidth: 480, margin: '60px auto' }}><p className="eyebrow">Private kitchen</p><h1>Backstage</h1><p style={{ margin: '20px 0' }}>Sign in to manage tonight's menu.</p><form className="editor" onSubmit={async (event) => { event.preventDefault(); setError(''); try { await signInWithServer(name, password); onSignedIn() } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to sign in') } }}><div className="field"><label htmlFor="admin-name">Admin name</label><input id="admin-name" value={name} onChange={(event) => setName(event.target.value)} required /></div><div className="field"><label htmlFor="admin-password">Password</label><input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>{error && <p role="alert" className="notice">{error}</p>}<button className="primary-button" type="submit">Enter the kitchen</button></form></section>
}
