export const setRole = (role: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem("leadflow_role", role);
    }
};

export const getRole = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem("leadflow_role");
    }
    return null;
};
