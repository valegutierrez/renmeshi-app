import { signOutFromServer } from '../../services/api'
import { Button } from '@mui/material'

export function SignOutButton({ onSignedOut }: { onSignedOut: () => void }) {
  return <Button className="nav-button" variant="text" type="button" onClick={async () => { await signOutFromServer(); onSignedOut() }}>Sign out</Button>
}
