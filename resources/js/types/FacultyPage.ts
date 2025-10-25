export interface LocalizedName {
    en: string;
    uz: string;
    ru: string;
}

export interface Department {
    id: number;
    name: LocalizedName;
    feedback_count: number;
    average_grade?: number | null;
    good_feedback_count?: number | null;
    average_feedback_count?: number | null;
    bad_feedback_count?: number | null;
}

export interface Faculty {
    id: number;
    name: LocalizedName;
    feedback_count: number;
    department_count: number;
    average_grade?: number | null;
}

export interface FacultyPageProps {
    faculty: Faculty;
    departments: Department[];
    locale: 'en' | 'uz' | 'ru';
    translations: Record<string, string>;
}
