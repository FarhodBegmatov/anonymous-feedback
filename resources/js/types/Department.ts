export interface Department {
    id: number;
    name: { en: string; uz: string; ru: string };
    faculty: { id: number; name: { en: string } } | null;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface DepartmentsPageProps {
    departments: {
        data: Department[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: PaginationLink[];
    };
    filters?: { search?: string };
    flash?: { success?: string; error?: string };
}

export interface DepartmentEditPageProps {
    department: Department;
    faculties: Array<{
        id: number;
        name: {
            en: string;
            uz: string;
            ru: string;
        };
    }>;
}

export interface DepartmentCreatePageProps {
    faculties: Array<{
        id: number;
        name: {
            en: string;
            uz: string;
            ru: string;
        };
    }>;
}
