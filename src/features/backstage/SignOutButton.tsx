import { signOutFromServer } from '../../services/api'

export function SignOutButton({ onSignedOut }: { onSignedOut: () => void }) {
  return <button className="nav-button" type="button" onClick={async () => { await signOutFromServer(); onSignedOut() }}>Sign out</button>
}
