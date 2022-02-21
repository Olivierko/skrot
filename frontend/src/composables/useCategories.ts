import { useApi } from "@/composables/useApi";
import { useResource } from "@/composables/useResource";
import { Category } from "@/types";

const {
    isLoading,
    items: categories,
    init,
    get,
    create,
    edit,
    remove,
} = useResource<Category>('/categories');

export function useCategories() {
    const find = (id: string): Category | undefined => {
        return categories.value.find((x) => x.id == id);
    };

    const api = useApi();
    init(api);

    return {
        isLoading,
        categories,
        get,
        find,
        create,
        edit,
        remove,
    }
};