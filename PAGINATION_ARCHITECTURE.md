# Pagination Architecture Documentation

This document explains the pagination implementation following **SOLID**, **DRY**, and **clean code principles**.

## 📋 Table of Contents
- [Overview](#overview)
- [Architecture Principles](#architecture-principles)
- [Backend Implementation](#backend-implementation)
- [Frontend Implementation](#frontend-implementation)
- [Usage Examples](#usage-examples)

---

## Overview

The pagination system is implemented across the entire application with a focus on:
- **Reusability**: Single pagination component used everywhere
- **Maintainability** - Centralized logic in base classes
- **Scalability** - Easy to extend for new features
- **Type Safety** - Full TypeScript support

---

## Architecture Principles

### 1. **SOLID Principles**

#### Single Responsibility Principle (SRP)
- **BaseRepository** - Handles only data access logic
- **FacultyTransformer** - Only transforms faculty data
- **DepartmentTransformer** - Only transforms department data
- **Pagination Component** - Only renders pagination UI
#### Open/Closed Principle (OCP)
- The Base repository is open for extension (child repositories can add methods)
- Closed for modification (core pagination logic doesn't change)

#### Dependency Inversion Principle (DIP)
- **Controllers depend on abstractions** (repositories, transformers)
- **Using dependency injection** via constructor (e.g., `FacultyController` depends on `FacultyRepository` and `FacultyTransformer`)

### 2. **DRY (Don't Repeat Yourself)**
- Common pagination logic in `BaseRepository`
- Single `Pagination.tsx` component reused across all pages
- Centralized type definitions in `Pagination.ts`
{{ ... }}
- Data transformation logic in dedicated transformer services

### 3. **Clean Code Practices**
- Clear, descriptive method names
- Comprehensive documentation comments
- Consistent code formatting
- Type-safe implementations

---

## Backend Implementation

### File Structure
```
app/
├── Http/Controllers/
│   └── MainController.php          # Uses repositories and transformers
├── Repositories/
│   ├── BaseRepository.php          # Base class with common logic (DRY)
│   ├── FacultyRepository.php       # Extends BaseRepository
│   ├── DepartmentRepository.php    # Extends BaseRepository
│   └── FeedbackRepository.php      # Extends BaseRepository
└── Services/
    └── Transformers/
        ├── FacultyTransformer.php      # Faculty data transformation (SRP)
        └── DepartmentTransformer.php   # Department data transformation (SRP)
```

### BaseRepository (DRY Principle)

```php
abstract class BaseRepository
{
    protected Model $model;

    // Common CRUD operations
    public function all(): Collection
    public function find(int $id): ?Model
    public function create(array $data): Model
    public function update(Model $model, array $data): Model
    public function delete(Model $model): bool
    
    // Centralized pagination logic
    public function paginate(int $perPage = 15, array $relations = []): LengthAwarePaginator
    
    // Query builder helpers
    protected function getBaseQuery(): Builder
    protected function withRelations(array $relations): Builder
}
```

### Transformers (Single Responsibility)

Transformers separate data transformation logic from controllers:

```php
class FacultyTransformer
{
    public function transform(Faculty $faculty): array
    public function transformCollection(Collection $faculties): Collection
    public function transformForDetailPage(Faculty $faculty): array
}
```

### Controller Implementation

Controllers use dependency injection and delegate responsibilities:

```php
public function __construct(
    private readonly FacultyRepository $facultyRepository,
    private readonly DepartmentRepository $departmentRepository,
    private readonly FeedbackRepository $feedbackRepository,
    private readonly FeedbackRatingService $ratingService,
    private readonly FacultyTransformer $facultyTransformer,
    private readonly DepartmentTransformer $departmentTransformer
) {}
```

---

## Frontend Implementation

### File Structure
```
resources/js/
├── components/
│   └── Pagination.tsx              # Reusable pagination component (DRY)
├── pages/
│   ├── Home.tsx                    # Uses Pagination component
│   ├── Faculty.tsx                 # Uses Pagination component
│   └── FeedbackForm.tsx            # Uses Pagination component
└── types/
    ├── Pagination.ts               # Centralized pagination types
    ├── Home.ts                     # Uses Paginator<Faculty>
    ├── FacultyPage.ts              # Uses Paginator<Department>
    └── FeedbackForm.ts             # Uses Paginator<Feedback>
```

### Pagination Component (Reusable)

Single component used across all pages:

```tsx
<Pagination links={data.links} className="optional-classes" />
```

Features include the following:
- ✅ Automatic hiding when only one page exists
- ✅ Clean, accessible HTML
- ✅ Responsive design
- ✅ Inertia.js integration with `preserveScroll` and `preserveState`

### Type Definitions

```typescript
interface Paginator<T> {
    data: T[];
    links: PaginationLink[];
    current_page: number;
    per_page: number;
    total: number;
    // ... other pagination metadata
}
```

---

## Usage Examples

### Backend: Adding Pagination to a New Repository

```php
class NewRepository extends BaseRepository
{
    public function __construct()
    {
        $this->model = new NewModel();
    }

    public function paginateWithRelations(int $perPage = 15): LengthAwarePaginator
    {
        return $this->paginate($perPage, ['relation1', 'relation2']);
    }
}
```

### Backend: Using in Controller

```php
public function index(): Response
{
    $items = $this->repository->paginateWithRelations(perPage: 12);
    
    $items->getCollection()->transform(
        fn($item) => $this->transformer->transform($item)
    );

    return Inertia::render('PageName', [
        'items' => $items,
    ]);
}
```

### Frontend: Display Paginated Data

```tsx
import Pagination from '@/components/Pagination';
import type { Paginator } from '@/types/Pagination';

interface Props {
    items: Paginator<ItemType>;
}

export default function Page({ items }: Props) {
    return (
        <>
            <div className="grid">
                {items.data.map(item => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
            
            <Pagination links={items.links} />
        </>
    );
}
```

---

## Pagination Settings

Current pagination limits per page:

| Page | Items per page | Repository Method |
|------|:--------------:|:------------------|

| Home (Faculties) | 12 | `FacultyRepository::paginateWithRelations(12)` |
| Faculty (Departments) | 12 | `DepartmentRepository::paginateByFaculty(12)` |
| Feedback Form | 20 | `FeedbackRepository::findByDepartmentWithComments(20)` |

To change the pagination limits, update the `perPage` parameter in the controller methods.

---

## Benefits of This Architecture

### ✅ **Maintainability**
- Changes to pagination logic only require updating `BaseRepository`
- UI changes only require updating `Pagination.tsx` component
- Data transformation logic is isolated in transformer services

### ✅ **Testability**
- Each component has a single responsibility
- Easy to mock repositories and transformers
- Clear separation of concerns

### ✅ **Scalability**
- Easy to add new paginated resources
- Consistent pattern across the application
- Type-safe throughout

### ✅ **Developer Experience**
- Clear, self-documenting code
- Consistent patterns reduce cognitive load
- TypeScript provides excellent IDE support

---

## Future Enhancements

Possible improvements include the following:
- Add a configurable items per page dropdown
- Implement cursor-based pagination for large datasets
- Add loading states during pagination
- Implement infinite scroll as an alternative
- Add URL query parameter support for page navigation

---

## Summary

This pagination implementation demonstrates enterprise-level architecture patterns:
- **SOLID principles** - ensure maintainable, extensible code
- **DRY principle** - eliminates code duplication
- **Clean code practices** - make it easy to understand and modify
- **Type safety** - catches errors at compile time
- **Separation of concerns** - makes testing easier

The result is a robust, scalable pagination system that can handle the application's growth.
