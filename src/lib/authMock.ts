export type UserRole = 'admin' | 'owner' | 'broker';

export interface User {
    id: string;
    name: string;
    role: UserRole;
}

// Placeholder for backend auth integration
export function getCurrentUser(): User {
    return { id: "temp-user", name: "Temp Admin", role: "admin" };
}
