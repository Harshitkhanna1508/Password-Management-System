import PasswordCard from './PasswordCard'

export default function VaultList({ entries, onEdit, onDelete }) {
  if (!entries || entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-[var(--color-surface-soft)] text-[var(--color-text-muted)] shadow-inner">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-[var(--color-text)] mb-3 uppercase tracking-tight">
          Vault is Empty
        </h3>
        <p className="text-xs max-w-xs text-[var(--color-text-muted)] font-bold uppercase tracking-widest leading-relaxed">
          SECURE YOUR FIRST ASSET BY CLICKING THE NEW ENTRY BUTTON.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-transparent">
      {entries.map((entry) => (
        <PasswordCard 
          key={entry._id || entry.id} 
          entry={entry} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  )
}
