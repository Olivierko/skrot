import { inject, ref, Ref, onMounted } from "vue";
import { Api, ApiResponse, Credentials } from "@/types";

const baseUrl = '//127.0.1:3030';

export function useApi(): Api {
    let isAuthenticated: Ref<boolean> = ref(false);

    onMounted(() => {
        isAuthenticated = inject<Ref<boolean>>("isAuthenticated")!;
    });

    const refreshAccessToken = async (): Promise<void> => {
        await fetch(`${baseUrl}/auth/refresh/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }).catch(x => x);
    };

    const invoke = async (resource: string, config: RequestInit, params?: URLSearchParams): Promise<Response> => {
        const url = `${baseUrl}${resource}?${params ? params : ''}`;

        config = {
            ...config,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }

        let response = await fetch(url, config);

        if (response.status === 401) {
            await refreshAccessToken();
            response = await fetch(url, config);
        }

        isAuthenticated.value = response.status === 401 ? false : true;

        return response;
    };

    const login = async (credentials: Credentials): Promise<ApiResponse> => {
        const response = await invoke('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        }).catch(x => x);

        if (!response.ok) {
            return { success: false, error: 'Invalid username/password' };
        }

        isAuthenticated.value = true;
        return { success: true, error: undefined };
    };

    const logout = async (): Promise<ApiResponse> => {
        const response = await invoke('/auth/invalidate', {
            method: 'POST',
        }).catch(x => x);

        if (!response.ok) {
            return { success: false, error: 'Failed to logout' };
        }

        return { success: true, error: undefined };
    };

    return {
        invoke,
        login,
        logout,
    }
};