type ServingScalerProps = { servings: number; onChange: (servings: number) => void }

export function ServingScaler({ servings, onChange }: ServingScalerProps) {
  return <div className="scale-row"><strong>Serves</strong><input className="serving-input" type="number" min="1" value={servings} onChange={(event) => { const next = Number(event.target.value); if (Number.isFinite(next) && next > 0) onChange(next) }} aria-label="Number of servings" /></div>
}
