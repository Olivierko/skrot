import { useApi } from "@/composables/useApi";
import { useResource } from "@/composables/useResource";
import { Exercise } from "@/types";

const {
    isLoading,
    items: exercises,
    init,
    get,
    create,
    edit,
    remove,
} = useResource<Exercise>('/exercises');

export function useExercises() {
    const find = (id: string): Exercise | undefined => {
        return exercises.value.find((x) => x.id == id);
    };

    const api = useApi();
    init(api);

    return {
        isLoading,
        exercises,
        get,
        find,
        create,
        edit,
        remove,
    }
};