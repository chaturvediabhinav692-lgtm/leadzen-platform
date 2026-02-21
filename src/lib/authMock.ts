export type UserRole = 'admin' | 'owner' | 'broker';

export interface User {
    id: string;
    name: string;
    role: UserRole;
}

// Mocking the current user session
// Change the 'role' here to test different dashboard behaviors
export const MOCK_USER: User = {
    id: 'broker_1',
    name: 'John Doe',
    role: 'broker'
};

export function getCurrentUser(): User {
    return MOCK_USER;
}
