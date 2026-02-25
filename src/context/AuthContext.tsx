"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

interface User {
    id: string;
    email: string;
    role: string;
    status: string;
    token: string;
    plan?: "starter" | "growth";
    subscriptionStart?: string;
    subscriptionEnd?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, pass: string) => Promise<User | null>;
    signup: (userData: any) => Promise<void>;
    googleLogin: () => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { users, currentUser, setCurrentUser, registerUser } = useStore();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        const storedUser = localStorage.getItem("user_data");

        if (token && storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, [setCurrentUser]);

    const login = async (email: string, pass: string) => {
        // Mock login against users in store
        const user = users.find(u => u.email === email);
        if (user) {
            // Check status first
            if (user.status === 'pending' || user.status === 'rejected') {
                return { ...user, token: "" }; // Return user without token to indicate block
            }

            const authUser = { ...user, token: "mock_token" };

            // Standard session keys
            localStorage.setItem("token", "mock_token");
            localStorage.setItem("user", JSON.stringify(authUser));
            localStorage.setItem("role", user.role);

            // Compatibility keys
            localStorage.setItem("auth_token", "mock_token");
            localStorage.setItem("user_data", JSON.stringify(authUser));
            localStorage.setItem("leadzen_role", user.role);

            if (user.role === 'admin') {
                localStorage.setItem("is_admin", "true");
            } else {
                localStorage.setItem("is_admin", "false");
            }

            setCurrentUser(authUser);
            return authUser;
        }
        return null;
    };

    const signup = async (userData: any) => {
        registerUser(userData);
    };

    const googleLogin = async () => {
        // Mock Google login
        const isAdmin = true; // For the specific user request
        const mockUser = {
            id: 'admin-1',
            email: 'chaturvediabhinav692@gmail.com',
            name: 'Abhinav Chaturvedi',
            role: 'admin',
            status: 'approved',
            businessName: 'Leadzen',
            token: 'google_token'
        };
        localStorage.setItem("token", "google_token");
        localStorage.setItem("user", JSON.stringify(mockUser));
        localStorage.setItem("role", "admin");

        localStorage.setItem("auth_token", "google_token");
        localStorage.setItem("user_data", JSON.stringify(mockUser));
        localStorage.setItem("leadzen_role", "admin");
        localStorage.setItem("is_admin", "true");
        setCurrentUser(mockUser);
    };

    const logout = () => {
        // Clear all session data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");

        // Legacy/Compat keys
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_data");
        localStorage.removeItem("leadzen_role");
        localStorage.removeItem("is_admin");

        // Clear cookies just in case
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        setCurrentUser(null);
        router.replace("/product/leadzen");
    };

    return (
        <AuthContext.Provider value={{ user: currentUser, login, signup, googleLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
