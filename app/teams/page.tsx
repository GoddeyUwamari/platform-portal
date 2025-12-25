'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TeamsPage() {
  return (
    <div className="space-y-6 px-4 md:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
        <p className="text-muted-foreground mt-2">Manage teams and service ownership</p>
      </div>
      <Card>
        <CardHeader><CardTitle>Teams</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">Teams management coming soon...</p></CardContent>
      </Card>
    </div>
  )
}
