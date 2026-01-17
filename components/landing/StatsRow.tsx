'use client'

/**
 * StatsRow Component
 *
 * Displays key metrics in a 3-column grid for social proof.
 */
export function StatsRow() {
  const stats = [
    { value: '500+', label: 'Teams using DevControl' },
    { value: '$10M+', label: 'AWS costs saved' },
    { value: '99.9%', label: 'Uptime SLA' },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-5xl font-bold text-[#635BFF] mb-2">
            {stat.value}
          </div>
          <div className="text-muted-foreground">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
