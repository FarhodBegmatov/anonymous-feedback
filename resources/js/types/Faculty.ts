export interface Faculty {
    id: number;
    name: {
        en: string;
        uz: string;
        ru: string;
    };
    departments_count?: number;
    feedbacks_count?: number;
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
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    flash?: {
        success?: string;
        error?: string;
    };
    filters?: {
        search?: string;
        type?: string;
    };
}

export interface FacultyEditPageProps {
    faculty: Faculty;
    flash?: {
        success?: string;
        error?: string;
    };
}
