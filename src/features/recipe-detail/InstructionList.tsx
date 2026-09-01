export function InstructionList({ instructions }: { instructions: string[] }) {
  return <ol className="step-list">{instructions.map((step) => <li key={step}>{step}</li>)}</ol>
}
