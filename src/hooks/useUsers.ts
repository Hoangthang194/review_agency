import { useState, useEffect, useCallback } from 'react';

export interface User {
    id: number;
    email: string;
    name: string;
    role: string;
    status: 'active' | 'locked' | 'suspended';
    last_login: string | null;
    created_at: string;
}

export interface UseUsersOptions {
    status?: string;
    role?: string;
    immediate?: boolean;
}

export interface UseUsersReturn {
    data: User[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

/**
 * Hook to fetch and manage users
 */
export function useUsers(options: UseUsersOptions = {}): UseUsersReturn {
    const { status, role, immediate = true } = options;

    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(immediate);
    const [error, setError] = useState<Error | null>(null);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            if (status) params.append('status', status);
            if (role) params.append('role', role);

            const url = `/api/users${params.toString() ? `?${params.toString()}` : ''}`;
            const response = await fetch(url);

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || `Failed to fetch users: ${response.statusText}`);
            }

            const result = await response.json();
            setData(result);
        } catch (err: any) {
            setError(err);
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    }, [status, role]);

    useEffect(() => {
        if (immediate) {
            fetchUsers();
        }
    }, [immediate, fetchUsers]);

    return {
        data,
        loading,
        error,
        refetch: fetchUsers,
    };
}

/**
 * Function to create a new user
 */
export async function createUser(userData: {
    email: string;
    password: string;
    name: string;
    role?: string;
    status?: string;
}): Promise<User> {
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || `Failed to create user: ${response.statusText}`);
        }

        return result;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

/**
 * Function to update a user
 */
export async function updateUser(
    userId: number,
    updatedData: Partial<Omit<User, 'id' | 'created_at' | 'last_login'>>
): Promise<User> {
    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || `Failed to update user: ${response.statusText}`);
        }

        return result;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

/**
 * Function to change user password
 */
export async function changeUserPassword(
    userId: number,
    password: string
): Promise<void> {
    try {
        const response = await fetch(`/api/users/${userId}/password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || `Failed to change password: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error changing password:', error);
        throw error;
    }
}

