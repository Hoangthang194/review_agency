"use client";

import { useState, useCallback } from "react";

export interface User {
    id: number;
    email: string;
    name: string;
    role: string;
    status: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface UseUserReturn {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: Error | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

/**
 * Hook to manage user authentication
 * Provides login, logout, and user state management
 */
export function useUser(): UseUserReturn {
    const [user, setUser] = useState<User | null>(() => {
        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem(USER_KEY);
            return storedUser ? JSON.parse(storedUser) : null;
        }
        return null;
    });

    const [token, setToken] = useState<string | null>(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem(TOKEN_KEY);
        }
        return null;
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const login = useCallback(async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `HTTP error! status: ${response.status}`);
            }

            const loginData: LoginResponse = data;

            // Store token and user in localStorage
            localStorage.setItem(TOKEN_KEY, loginData.token);
            localStorage.setItem(USER_KEY, JSON.stringify(loginData.user));

            // Update state
            setToken(loginData.token);
            setUser(loginData.user);
        } catch (err) {
            const error = err instanceof Error ? err : new Error("Failed to login");
            setError(error);
            setUser(null);
            setToken(null);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        // Remove token and user from localStorage
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);

        // Clear state
        setToken(null);
        setUser(null);
        setError(null);
    }, []);

    const isAuthenticated = user !== null && token !== null;

    return {
        user,
        token,
        loading,
        error,
        login,
        logout,
        isAuthenticated,
    };
}

