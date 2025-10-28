interface LocalizedName {
    en: string;
    uz: string;
    ru: string;
    [key: string]: string | undefined;
}

interface Department {
    id: number;
    name: LocalizedName;
}

export interface FeedbackFormProps {
    department: Department;
    locale: 'en' | 'uz' | 'ru';
    translations: Record<string, string>;
}

export interface FlashMessages {
    success?: string;
    error?: string;
}

export type GradeType = 'good' | 'average' | 'bad';
