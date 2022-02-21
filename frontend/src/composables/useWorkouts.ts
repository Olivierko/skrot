import { useApi } from "@/composables/useApi";
import { useResource } from "@/composables/useResource";
import { Workout } from "@/types";

export const reviver = (key: string, value: string): any => {
    if (key === "start" || key === "end") {
        return new Date(value);
    }

    return value;
};

const {
    isLoading,
    items: workouts,
    page,
    pages,
    count,
    init,
    get,
    create,
    edit,
    remove,
} = useResource<Workout>('/workouts', reviver);

export function useWorkouts() {
    const api = useApi();
    init(api);

    return {
        isLoading,
        workouts,
        page,
        pages,
        count,
        get,
        create,
        edit,
        remove,
    }
};