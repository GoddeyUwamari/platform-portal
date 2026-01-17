'use client'

/**
 * CompanyLogos Component
 *
 * Displays a grid of company logos as social proof.
 * Uses placeholder colored boxes initially - replace with actual logos.
 */
export function CompanyLogos() {
  const companies = [
    { name: 'TechCorp', color: 'bg-blue-500' },
    { name: 'DataFlow', color: 'bg-green-500' },
    { name: 'CloudScale', color: 'bg-purple-500' },
    { name: 'DevOps Pro', color: 'bg-orange-500' },
    { name: 'SecureNet', color: 'bg-indigo-500' },
  ]

  return (
    <div className="flex flex-wrap items-center justify-center gap-12 mb-20 opacity-60 hover:opacity-100 transition-all duration-300">
      {companies.map((company, index) => (
        <div
          key={index}
          className="h-8 w-32 rounded flex items-center justify-center text-white text-sm font-semibold transition-transform hover:scale-110"
          style={{ backgroundColor: company.color.replace('bg-', '') }}
        >
          <div className={`h-8 w-32 ${company.color} rounded flex items-center justify-center`}>
            {company.name}
          </div>
        </div>
      ))}
    </div>
  )
}
