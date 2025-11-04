export interface Manager {
    id: number;
    name: string;
    email: string;
    role: string;
    manageable_type: string;
    manageable_id: number;
    manageable?: {
        id: number;
        name: {
            en: string;
            uz: string;
            ru: string;
        };
    } | null;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedManagers {
    data: Manager[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface ManagersPageProps {
    managers: PaginatedManagers;
    filters?: {
        search?: string;
        type?: string;
    };
    flash?: {
        success?: string;
        error?: string;
    };
}

export interface ManagerEditPageProps {
    manager: Manager;
    manageableNameUz: string | null;
    faculties: Array<{
        id: number;
        name: {
            en: string;
            uz: string;
            ru: string;
        };
    }>;
    departments: Array<{
        id: number;
        name: {
            en: string;
            uz: string;
            ru: string;
        };
    }>;
}

export interface ManagerCreatePageProps {
    faculties: Array<{
        id: number;
        name: {
            en: string;
            uz: string;
            ru: string;
        };
    }>;
    departments: Array<{
        id: number;
        name: {
            en: string;
            uz: string;
            ru: string;
        };
    }>;
}
