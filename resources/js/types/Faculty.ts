export interface Faculty {
    id: number;
    name: {
        en: string;
        uz: string;
        ru: string;
    };
    departments_count?: number;
    feedback_count?: number;
    average_score?: number | null;
}
