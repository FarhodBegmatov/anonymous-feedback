# Pagination Quick Reference Guide

## 🚀 Quick Start

### Adding Pagination to a New Resource

#### 1. Backend: Create Repository (extends BaseRepository)

```php
// app/Repositories/YourRepository.php
<?php

namespace App\Repositories;

use App\Models\YourModel;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class YourRepository extends BaseRepository
{
    public function __construct()
    {
        $this->model = new YourModel();
    }

    public function paginateWithRelations(int $perPage = 15): LengthAwarePaginator
    {
        return $this->paginate($perPage, ['relation1', 'relation2']);
    }
}
```

#### 2. Backend: Create Transformer (Optional but recommended)

```php
// app/Services/Transformers/YourTransformer.php
<?php

namespace App\Services\Transformers;

use App\Models\YourModel;
use Illuminate\Support\Collection;

class YourTransformer
{
    public function transform(YourModel $item): array
    {
        return [
            'id' => $item->id,
            'name' => $item->name,
            // ... other fields
        ];
    }

    public function transformCollection(Collection $items): Collection
    {
        return $items->map(fn($item) => $this->transform($item));
    }
}
```

#### 3. Backend: Use in Controller

```php
// app/Http/Controllers/YourController.php
public function __construct(
    private readonly YourRepository $repository,
    private readonly YourTransformer $transformer
) {}

public function index(): Response
{
    $items = $this->repository->paginateWithRelations(perPage: 15);
    
    $items->getCollection()->transform(
        fn($item) => $this->transformer->transform($item)
    );

    return Inertia::render('YourPage', [
        'items' => $items,
    ]);
}
```

#### 4. Frontend: Define Types

```typescript
// resources/js/types/YourPage.ts
import { Paginator } from './Pagination';

export interface YourItem {
    id: number;
    name: string;
    // ... other fields
}

export interface YourPageProps {
    items: Paginator<YourItem>;
    locale: 'en' | 'uz' | 'ru';
    translations: Record<string, string>;
}
```

#### 5. Frontend: Use in Page Component

```tsx
// resources/js/pages/YourPage.tsx
import Pagination from '@/components/Pagination';
import type { YourPageProps } from '@/types/YourPage';

export default function YourPage({ items, locale, translations }: YourPageProps) {
    return (
        <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.data.map((item) => (
                    <div key={item.id}>
                        {/* Your item card */}
                    </div>
                ))}
            </div>
            
            <Pagination links={items.links} />
        </>
    );
}
```

---

## 📚 Common Patterns

### Pattern 1 - Custom Query in Repository

```php
public function paginateByStatus(string $status, int $perPage = 15): LengthAwarePaginator
{
    return $this->getBaseQuery()
        ->where('status', $status)
        ->with('relations')
        ->orderBy('created_at', 'desc')
        ->paginate($perPage);
}
```

### Pattern 2 - Multiple Transformations

```php
public function index(): Response
{
    $items = $this->repository->paginateWithRelations(15);
    
    // Transform the paginated collection
    $items->getCollection()->transform(function ($item) {
        $transformed = $this->transformer->transform($item);
        // Add extra computed fields
        $transformed['extra_field'] = $this->computeExtraField($item);
        return $transformed;
    });

    return Inertia::render('Page', ['items' => $items]);
}
```

### Pattern 3 - Conditional Pagination

```php
public function index(Request $request): Response
{
    $perPage = $request->input('per_page', 15);
    $perPage = min(max($perPage, 10), 100); // Limit between 10-100
    
    $items = $this->repository->paginateWithRelations($perPage);
    
    return Inertia::render('Page', ['items' => $items]);
}
```

---

## 🎨 Frontend Customization

### Custom Pagination Styling

```tsx
<Pagination 
    links={items.links} 
    className="mt-8 justify-end" 
/>
```

### Conditional Rendering

```tsx
{items.data && items.data.length > 0 ? (
    <>
        <div className="grid">
            {items.data.map(item => (
                <ItemCard key={item.id} item={item} />
            ))}
        </div>
        <Pagination links={items.links} />
    </>
) : (
    <EmptyState message="No items found" />
)}
```

### Loading States

```tsx
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function Page({ items }) {
    const [loading, setLoading] = useState(false);

    router.on('start', () => setLoading(true));
    router.on('finish', () => setLoading(false));

    return (
        <>
            {loading && <LoadingSpinner />}
            <div className={loading ? 'opacity-50' : ''}>
                {items.data.map(item => <ItemCard key={item.id} item={item} />)}
            </div>
            <Pagination links={items.links} />
        </>
    );
}
```

---

## 🔧 Configuration

### Change Items Per Page

In controller:
```php
$items = $this->repository->paginateWithRelations(perPage: 25);
```

### Per-Page from Request

```php
public function index(Request $request): Response
{
    $perPage = $request->integer('per_page', 15);
    $items = $this->repository->paginateWithRelations($perPage);
    
    return Inertia::render('Page', ['items' => $items]);
}
```

---

## 🐛 Troubleshooting

### Problem - "Class not found: BaseRepository"
```bash
composer dump-autoload
```

### Problem - TypeScript errors on `items.data`
```typescript
// Make sure to import and use Paginator type
import { Paginator } from '@/types/Pagination';

interface Props {
    items: Paginator<ItemType>; // ✅ Correct
    // items: ItemType[];        // ❌ Wrong
}
```

### Problem - Pagination not showing
- Check if you have enough data (more than the perPage limit)
- Verify `items.links` is being passed to `<Pagination />`
- Check the browser console for errors

### Problem - Styling issues
```bash
# Rebuild Tailwind
npm run build
# or
npm run dev
```

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────┐
│            MainController                   │
│  (Dependency Injection)                     │
└─────────────────┬───────────────────────────┘
                  │
        ┌─────────┴──────────┐
        │                    │
        ▼                    ▼
┌──────────────┐    ┌──────────────┐
│ Repositories │    │ Transformers │
│ (Data Layer) │    │ (Transform)  │
└──────┬───────┘    └──────┬───────┘
       │                   │
       ▼                   ▼
┌──────────────────────────────────┐
│     Paginated Response           │
│  (sent to Frontend via Inertia)  │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│      React Component             │
│  - Display items.data            │
│  - Render <Pagination />         │
└──────────────────────────────────┘
```

---

## ✅ Best Practices

1. **Always use transformers** for data shaping
2. **Keep perPage reasonable** (10-50 items)
3. **Add loading states** for better UX
4. **Preserve scroll position** using Inertia's `preserveScroll`
5. **Handle empty states** gracefully
6. **Use TypeScript types** for type safety
7. **Don't fetch all data** for statistics - use separate queries
8. **Cache expensive calculations** when possible

---

## 📖 Related Files

- **Base Repository** - `app/Repositories/BaseRepository.php`
- **Pagination Component** - `resources/js/components/Pagination.tsx`
- **Pagination Types** - `resources/js/types/Pagination.ts`
- **Example Controller** - `app/Http/Controllers/MainController.php`
- **Example Transformers** - `app/Services/Transformers/`
- **Full Documentation** - `PAGINATION_ARCHITECTURE.md`
- **Testing Guide** - `PAGINATION_TESTING_CHECKLIST.md`

---

**Need help?** Check the full architecture documentation or the testing checklist.
