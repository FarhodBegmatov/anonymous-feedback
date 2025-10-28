export interface Faculty {
    id: number;
    name: {
        en: string;
        uz: string;
        ru: string;
    };
    created_at?: string;
    updated_at?: string;
}

export interface FacultyFormData {
    name: {
        en: string;
        uz: string;
        ru: string;
    };
}

export interface FacultiesPageProps {
    faculties: {
        data: Faculty[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: any[];
    };
    flash?: {
        success?: string;
        error?: string;
    };
}

export interface FacultyEditPageProps {
    faculty: Faculty;
    flash?: {
        success?: string;
        error?: string;
    };
}
