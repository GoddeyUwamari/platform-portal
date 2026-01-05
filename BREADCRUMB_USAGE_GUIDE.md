# Breadcrumb Navigation - Usage Guide

## Overview
Breadcrumbs are automatically added to all pages via the app layout. They auto-generate based on the current URL path.

## How It Works

### Automatic Breadcrumbs
Breadcrumbs are automatically generated from the URL path. No additional code needed!

**Example URL paths and their breadcrumbs:**
```
/dashboard → Dashboard
/services → Dashboard > Services
/deployments → Dashboard > Deployments
/settings/billing → Dashboard > Settings > Billing
/aws-resources → Dashboard > AWS Resources
```

## Custom Labels for Dynamic Routes

When you have dynamic segments (IDs) in your URL, you can provide custom labels.

### Example: Service Detail Page

**File:** `app/(app)/services/[id]/page.tsx`

```tsx
'use client';

import { BreadcrumbWrapper } from '@/components/ui/breadcrumb-wrapper';

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const { data: service } = useQuery({
    queryKey: ['service', params.id],
    queryFn: () => getService(params.id),
  });

  return (
    <div>
      {/* Option 1: Use custom label for ID */}
      {service && (
        <BreadcrumbWrapper
          customLabels={{ [params.id]: service.name }}
          className="mb-6"
        />
      )}

      {/* Rest of page */}
    </div>
  );
}
```

**Result:** `Dashboard > Services > Payment Service` (instead of `Dashboard > Services > abc123...`)

### Example: Manual Breadcrumbs

For complete control, provide custom items:

```tsx
import { BreadcrumbWrapper } from '@/components/ui/breadcrumb-wrapper';

<BreadcrumbWrapper
  items={[
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Custom Section', href: '/custom' },
    { label: 'Detail Page' }, // Current page (no href)
  ]}
/>
```

## Route Label Mapping

The following route segments have predefined labels:

| URL Segment | Display Label |
|-------------|---------------|
| dashboard | Dashboard |
| services | Services |
| deployments | Deployments |
| aws-resources | AWS Resources |
| teams | Teams |
| monitoring | Monitoring |
| settings | Settings |
| billing | Billing |
| profile | Profile |
| organization | Organization |
| audit-logs | Audit Logs |

**Custom segments** are automatically formatted: `my-custom-page` → `My Custom Page`

## Styling

Breadcrumbs use the following styles:
- **Inactive links:** Gray text with hover effect
- **Current page:** Bold dark text (not clickable)
- **Separators:** Chevron Right icon
- **Mobile:** Shows only parent + current (last 2 items)
- **Desktop:** Shows full path

## Hide Breadcrumbs on Specific Pages

If you need to hide breadcrumbs on a specific page, override them in the layout or page:

```tsx
// In page component
export default function SpecialPage() {
  return (
    <>
      {/* Don't render BreadcrumbWrapper */}
      <div>Page content without breadcrumbs</div>
    </>
  );
}
```

## Accessibility

Breadcrumbs include proper ARIA labels:
- `aria-label="Breadcrumb"` on nav element
- `aria-current="page"` on current page item

## Examples

### Simple Page (Auto-generated)
No additional code needed! Breadcrumbs work automatically.

### Dynamic Route with Custom Label
```tsx
// app/(app)/teams/[teamId]/page.tsx
const team = await getTeam(params.teamId);

<BreadcrumbWrapper
  customLabels={{ [params.teamId]: team.name }}
/>
```

### Nested Settings Page
```tsx
// app/(app)/settings/organization/page.tsx
// Automatically shows: Dashboard > Settings > Organization
```

### Override for Special Case
```tsx
<BreadcrumbWrapper
  items={[
    { label: 'Home', href: '/' },
    { label: 'Special Section', href: '/special' },
    { label: 'Current Page' },
  ]}
/>
```

## Troubleshooting

**Breadcrumbs not showing:**
- Check that you're on an authenticated page under `/app/(app)/`
- Verify the URL path is not `/login` or root `/`

**Wrong labels:**
- Add custom labels via `customLabels` prop
- Update `routeLabels` map in `lib/hooks/useBreadcrumbs.ts`

**Styling issues:**
- Breadcrumbs use Tailwind classes and dark mode support
- Override with `className` prop if needed

## Performance

Breadcrumbs are memoized and only recalculate when:
- URL pathname changes
- Custom labels change

No performance impact! 🚀
