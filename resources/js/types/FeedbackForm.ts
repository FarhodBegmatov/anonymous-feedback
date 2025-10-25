export interface LocalizedName {
    en: string;
    uz: string;
    ru: string;
}

export interface Department {
    id: number;
    name: LocalizedName;
}

export interface Feedback {
    id: number;
    grade: string;
    comment: string;
    created_at: string;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedFeedback {
    data: Feedback[];
    links: PaginationLink[];
}

export interface FlashMessages {
    success?: string;
    error?: string;
}

export interface FeedbackFormProps {
    department: Department;
    feedbacks: PaginatedFeedback;
    locale: 'en' | 'uz' | 'ru';
    translations: Record<string, string>;
}

export type GradeType = 'good' | 'average' | 'bad';
