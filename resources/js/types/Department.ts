export interface Department {
    id: number;
    name: {
        en: string;
        uz: string;
        ru: string
    };
    feedbacks_count?: number;
    average_grade?: number | null;
    faculty_id?: number | null;
    faculty?: {
        id: number;
        name: {
            en: string;
            uz: string;
            ru: string;
        }
    }
    // faculty: { id: number; name: { en: string } } | null;
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
        links: PaginationLink[];
    };
    filters?: {
        search?: string
    };
    flash?: {
        success?: string; error?: string
    };
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
