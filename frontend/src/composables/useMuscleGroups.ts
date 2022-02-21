import { useApi } from "@/composables/useApi";
import { useResource } from "@/composables/useResource";
import { MuscleGroup } from "@/types";

const {
    isLoading,
    items: muscleGroups,
    init,
    get,
    create,
    edit,
    remove,
} = useResource<MuscleGroup>('/muscle-groups');

export function useMuscleGroups() {
    const find = (id: string): MuscleGroup | undefined => {
        return muscleGroups.value.find((x) => x.id == id);
    };

    const api = useApi();
    init(api);

    return {
        isLoading,
        muscleGroups,
        get,
        find,
        create,
        edit,
        remove,
    }
};