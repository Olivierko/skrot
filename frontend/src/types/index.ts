export interface ExerciseSetEntry {
    id: string;
    repititions: number;
    weight: number;
    unit: string;
}

export interface ExerciseEntry {
    id: string;
    exerciseId: string;
    notes: string;
    sets: ExerciseSetEntry[];
}

export interface Exercise {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    muscleGroupId: string;
}

export interface MuscleGroup {
    id: string;
    name: string;
}

export interface Workout {
    id: string;
    start: Date;
    end: Date;
    exercises: ExerciseEntry[];
}

export interface Category {
    id: string;
    name: string;
}

export interface ApiResponse {
    success: boolean;
    error: string | undefined;
}

export type ApiInvoke = (resource: string, config: RequestInit, params?: URLSearchParams) => Promise<Response>;
export type ApiLogin = (credentials: Credentials) => Promise<ApiResponse>;
export type ApiLogout = () => Promise<ApiResponse>;

export interface Api {
    invoke: ApiInvoke;
    login: ApiLogin;
    logout: ApiLogout;
}

export interface Credentials {
    username: string;
    password: string;
}

export interface Profile {
    unit: string;
}