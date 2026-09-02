import { useState } from 'react'
import { Alert, Button, Stack, TextField, Typography } from '@mui/material'
import { signInWithServer } from '../../services/api'

export function SignInPage({ onSignedIn }: { onSignedIn: () => void }) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  return <section className="detail-panel" style={{ maxWidth: 480, margin: '60px auto' }}><h1>Backstage</h1><Typography sx={{ margin: '20px 0' }}>Sign in to manage tonight's menu.</Typography><Stack component="form" className="editor" spacing={2} onSubmit={async (event) => { event.preventDefault(); setError(''); try { await signInWithServer(name, password); onSignedIn() } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to sign in') } }}><TextField id="admin-name" label="Admin name" value={name} onChange={(event) => setName(event.target.value)} required /><TextField id="admin-password" label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />{error && <Alert severity="error" role="alert">{error}</Alert>}<Button variant="contained" type="submit">Enter the kitchen</Button></Stack></section>
}
