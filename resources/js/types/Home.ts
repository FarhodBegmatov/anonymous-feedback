import { Paginator } from './Pagination';

export interface LocalizedName {
    en: string;
    uz: string;
    ru: string;
}

export interface Faculty {
    id: number;
    name: LocalizedName;
    departments_count: number;
    feedback_count: number;
    average_grade?: number | null;
}

export interface HomePageProps {
    total_faculties: number;
    total_feedbacks: number;
    global_average_grade: number | null;
    faculties: Paginator<Faculty>;
    locale: 'en' | 'uz' | 'ru';
    translations: Record<string, string>;
}

export interface RatingColors {
    ratingColor: string;
    barColor: string;
}
