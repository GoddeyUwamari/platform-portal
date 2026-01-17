'use client'

import { CompanyLogos } from './CompanyLogos'
import { StatsRow } from './StatsRow'

/**
 * SocialProofSection Component
 *
 * Displays company logos and trust statistics to build credibility.
 */
export function SocialProofSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Trusted by platform teams worldwide
          </h2>
          <p className="text-xl text-muted-foreground">
            Join hundreds of engineering teams shipping faster
          </p>
        </div>

        {/* Company Logos */}
        <CompanyLogos />

        {/* Stats Row */}
        <StatsRow />
      </div>
    </section>
  )
}
