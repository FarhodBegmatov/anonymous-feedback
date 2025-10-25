export interface LocalizedName {
    en: string;
    uz: string;
    ru: string;
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

export interface RatingsPageProps {
    faculties: Faculty[];
    locale: 'en' | 'uz' | 'ru';
    translations: Record<string, string>;
}

export interface RatingColorClass {
    textColor: string;
    bgColor: string;
}
