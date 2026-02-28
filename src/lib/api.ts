const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    error?: string;
}

export async function apiRequest<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const headers = new Headers({
        "Content-Type": "application/json",
        ...(options.headers || {}),
    });

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result: ApiResponse<T> = await res.json();

    if (!result.success) {
        throw new Error(result.error || "API request failed");
    }

    return result.data;
}
