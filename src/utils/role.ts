export const setRole = (role: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem("leadzen_role", role);
    }
};

export const getRole = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem("leadzen_role");
    }
    return null;
};
