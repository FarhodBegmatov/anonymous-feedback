export interface LocalizedName {
    en: string;
    uz: string;
    ru: string;
    [key: string]: string | undefined;
}

export interface Department {
    id: number;
    name: LocalizedName;
    feedback_count: number;
    average_grade: number | null;
}

export interface Faculty {
    id: number;
    name: LocalizedName;
    average_grade: number | null;
    departments: Department[];
}

export interface Statistics {
    total_faculties: number;
    total_departments: number;
    total_feedbacks: number;
    average_faculty_rating: number | null;
}

export interface RatingsPageProps {
    faculties: Faculty[];
    locale: 'en' | 'uz' | 'ru';
    translations: Record<string, string>;
    statistics: Statistics;
}

export interface RatingColorClass {
    textColor: string;
    bgColor: string;
}
