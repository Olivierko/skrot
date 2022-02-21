import { ref, computed } from "vue";
import { Api, ApiInvoke, ApiResponse } from "@/types";

export type Reviver = (key: string, value: string) => any;

export function useResource<T>(resource: string, reviver?: Reviver) {
    let invoke: ApiInvoke;
    const isStale = ref(true);
    const isLoading = ref(false);
    const isRefreshing = ref(false);
    const items = ref<Array<T>>([]);

    const pageInternal = ref(1);

    const page = computed<number>({
        get() {
            return pageInternal.value;
        },
        set(value) {
            pageInternal.value = value;
            refresh();
        },
    });

    const pages = ref(0);
    const count = ref(0);

    const refresh = async (): Promise<void> => {
        isRefreshing.value = true;
        isLoading.value = true;

        const params = new URLSearchParams({
            page: pageInternal.value.toString()
        });

        const response = await invoke(resource, {
            method: 'GET',
        }, params);

        if (!reviver) {
            const data = await response.json();
            items.value = data.items;
            pageInternal.value = data.page;
            pages.value = data.pages;
            count.value = data.count;
        }
        else {
            const text = await response.text();
            const parsed = JSON.parse(text, reviver);
            items.value = parsed.items;
            pageInternal.value = parsed.page;
            pages.value = parsed.pages;
            count.value = parsed.count;
        }

        isLoading.value = false;
        isRefreshing.value = false;

        if (response.ok) {
            isStale.value = false;
        }
    };

    const init = async (api: Api): Promise<void> => {
        invoke = api.invoke;
        if (isStale.value && !isRefreshing.value) {
            refresh();
        }
    };

    const get = async (id: string): Promise<T> => {
        isLoading.value = true;

        const response = await invoke(resource + `/${id}`, {
            method: 'GET'
        });

        let json: any;
        if (!reviver) {
            json = await response.json();
        }
        else {
            const text = await response.text();
            json = JSON.parse(text, reviver);
        }

        isLoading.value = false;

        return json as T;
    };

    const create = async (model: T): Promise<ApiResponse> => {
        isLoading.value = true;

        const response = await invoke(resource, {
            method: 'POST',
            body: JSON.stringify(model)
        }).catch(x => x);

        isLoading.value = false;

        if (!response.ok) {
            return { success: false, error: response.statusText };
        }

        isStale.value = true;
        return { success: true, error: undefined };
    };

    const edit = async (id: string, model: T): Promise<ApiResponse> => {
        isLoading.value = true;

        const response = await invoke(resource + `/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(model)
        }).catch(x => x);

        isLoading.value = false;

        if (!response.ok) {
            return { success: false, error: response.statusText };
        }

        isStale.value = true;
        return { success: true, error: undefined };
    };

    const remove = async (id: string): Promise<ApiResponse> => {
        isLoading.value = true;

        const response = await invoke(resource + `/${id}`, {
            method: 'DELETE',
        }).catch(x => x);

        isLoading.value = false;

        if (!response.ok) {
            return { success: false, error: response.statusText };
        }

        isStale.value = true;
        return { success: true, error: undefined };
    };

    return {
        isLoading,
        items,
        page,
        pages,
        count,
        init,
        get,
        create,
        edit,
        remove,
    }
};