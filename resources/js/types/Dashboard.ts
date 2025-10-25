import { PageProps } from '@inertiajs/core';

export interface LocalizedName {
    uz: string;
    en?: string;
    ru?: string;
}

export interface Feedback {
    id: number;
    comment: string;
    grade: string;
    rating: number;
    created_at?: string;
}

export interface Department {
    id: number;
    name: LocalizedName;
    feedback_count?: number;
    average?: number | null;
    feedbacks?: Feedback[];
}

export interface Faculty {
    id: number;
    name: LocalizedName;
}

export interface DashboardProps extends PageProps {
    type?: 'faculty' | 'department' | null;
    faculty?: Faculty | null;
    departments?: Department[];
    department?: {
        id: number;
        name: LocalizedName;
        faculty: Faculty;
    } | null;
    feedbacks?: Feedback[] | null;
    average?: number | null;
    message?: string | null;
}
