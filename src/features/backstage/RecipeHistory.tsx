import type { RecipeHistoryEntry } from '../../services/api'

export function RecipeHistory({ history }: { history: RecipeHistoryEntry[] }) {
  return <div className="history">{history.length ? history.map((entry) => <div className="history-row" key={entry.id}><span><strong>{entry.recipeName}</strong><br /><small>{entry.action} by {entry.actor}</small></span><small>{new Date(entry.timestamp).toLocaleString()}</small></div>) : <p>No changes recorded yet.</p>}</div>
}
