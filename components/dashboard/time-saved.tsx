/**
 * Time Saved Dashboard
 * Converts automation hours into FTE and $ value
 *
 * Shows: "That's 5 engineers' worth of work = $106k/mo labor cost"
 */

'use client';

import { Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SALES_DEMO_DATA } from '@/lib/demo/sales-demo-data';

interface TimeSavedProps {
  demoMode?: boolean;
  realData?: {
    timeSaved: Array<{
      task: string;
      hours: number;
      description: string;
    }>;
    fteEquivalent: number;
    laborCostSaved: number;
    engineeringHourlyRate: number;
  };
}

export function TimeSaved({ demoMode = false, realData }: TimeSavedProps) {
  const data = demoMode ? SALES_DEMO_DATA : realData;

  if (!data) return null;

  const totalHours = data.timeSaved.reduce((sum, item) => sum + item.hours, 0);

  return (
    <Card className="border-2 border-blue-200 hover:shadow-lg transition-all">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Clock className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <CardTitle className="text-xl">Team Time Saved</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {totalHours} hours this month
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-2xl font-bold text-blue-700">
                {data.fteEquivalent}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">engineers</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tasks Automated */}
        <div>
          <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            What DevControl Automated For You
          </p>
          <div className="space-y-3">
            {data.timeSaved.map((task, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                <span className="text-2xl">🤖</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-semibold text-sm text-gray-900">{task.task}</p>
                    <span className="text-lg font-bold text-blue-700 whitespace-nowrap">
                      {task.hours}h
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 italic">"{task.description}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Labor Cost Calculation */}
        <div className="pt-4 border-t">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div className="text-sm">
                <p className="font-bold text-blue-900 text-lg mb-2">
                  {totalHours} hours = {data.fteEquivalent} full-time engineers for a month
                </p>
                <p className="text-blue-700">
                  That's{' '}
                  <span className="font-bold text-xl text-blue-900">
                    ${data.laborCostSaved.toLocaleString()}/mo
                  </span>{' '}
                  in labor cost
                  <br />
                  <span className="text-xs text-blue-600">
                    (at ${data.engineeringHourlyRate}/hr engineering rate)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
