export class ApiService {
    private static getCSRFToken(): string {
        return (
            document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute('content') || ''
        );
    }

    private static getHeaders(includeContentType = false): HeadersInit {
        const headers: HeadersInit = {
            'X-CSRF-TOKEN': this.getCSRFToken(),
            'X-Requested-With': 'XMLHttpRequest',
            Accept: 'application/json',
        };

        if (includeContentType) {
            headers['Content-Type'] = 'application/json';
        }

        return headers;
    }

    static async delete(url: string): Promise<Response> {
        const formData = new FormData();
        formData.append('_method', 'DELETE');

        return fetch(url, {
            method: 'POST',
            headers: this.getHeaders(),
            body: formData,
        });
    }

    static async post(url: string, data: unknown): Promise<Response> {
        return fetch(url, {
            method: 'POST',
            headers: this.getHeaders(true),
            body: JSON.stringify(data),
        });
    }

    static async put(url: string, data: unknown): Promise<Response> {
        return fetch(url, {
            method: 'PUT',
            headers: this.getHeaders(true),
            body: JSON.stringify(data),
        });
    }

    static async get(url: string): Promise<Response> {
        return fetch(url, {
            method: 'GET',
            headers: this.getHeaders(),
        });
    }
}
