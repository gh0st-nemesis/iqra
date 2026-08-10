interface ProgressBarProps {
  value: number
  max: number
  colorClass?: string
  label?: string
}

export default function ProgressBar({ value, max, colorClass = 'bg-brand-600', label }: ProgressBarProps) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
  return (
    <div>
      {label && (
        <div className="mb-1 flex items-center justify-between text-xs font-medium text-brand-700 dark:text-slate-200">
          <span>{label}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-brand-100 dark:bg-slate-700">
        <div
          className={`h-full rounded-full ${colorClass} transition-all duration-500 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
