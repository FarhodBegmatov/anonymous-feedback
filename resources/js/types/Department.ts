export interface Department {
    id: number;
    faculty_id: number;
    name: {
        en: string;
        uz: string;
        ru: string;
    };
    faculty?: {
        id: number;
        name: {
            en: string;
            uz: string;
            ru: string;
        };
    };
}

export interface DepartmentsPageProps {
    departments: Department[];
    flash?: {
        success?: string;
        error?: string;
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
