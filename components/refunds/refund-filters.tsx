'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface RefundFilters {
  status?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

interface RefundFiltersProps {
  filters: RefundFilters;
  onFiltersChange: (filters: RefundFilters) => void;
}

export function RefundFiltersComponent({ filters, onFiltersChange }: RefundFiltersProps) {
  const [searchInput, setSearchInput] = useState(filters.search || '');

  const handleStatusChange = (value: string) => {
    onFiltersChange({
      ...filters,
      status: value === 'all' ? undefined : value,
    });
  };

  const handleSearchSubmit = () => {
    onFiltersChange({
      ...filters,
      search: searchInput || undefined,
    });
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
    onFiltersChange({
      ...filters,
      search: undefined,
    });
  };

  const handleDateRangeChange = (type: 'start' | 'end', value: string) => {
    if (type === 'start') {
      onFiltersChange({
        ...filters,
        startDate: value || undefined,
      });
    } else {
      onFiltersChange({
        ...filters,
        endDate: value || undefined,
      });
    }
  };

  const hasActiveFilters =
    filters.status || filters.search || filters.startDate || filters.endDate;

  const handleClearAll = () => {
    setSearchInput('');
    onFiltersChange({});
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Status Filter */}
        <Select value={filters.status || 'all'} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="succeeded">Succeeded</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        {/* Search */}
        <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-[400px]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by refund or payment ID..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              className="pl-9 pr-9"
            />
            {searchInput && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button onClick={handleSearchSubmit} size="sm">
            Search
          </Button>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="outline" onClick={handleClearAll} size="sm">
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Date Range */}
      <div className="flex items-center gap-2">
        <Input
          type="date"
          placeholder="Start Date"
          value={filters.startDate || ''}
          onChange={(e) => handleDateRangeChange('start', e.target.value)}
          className="w-[160px]"
        />
        <span className="text-muted-foreground">to</span>
        <Input
          type="date"
          placeholder="End Date"
          value={filters.endDate || ''}
          onChange={(e) => handleDateRangeChange('end', e.target.value)}
          className="w-[160px]"
        />
      </div>
    </div>
  );
}
