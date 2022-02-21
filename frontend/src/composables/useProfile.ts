import { ref, reactive } from "vue";
import { useApi } from "@/composables/useApi";
import { ApiResponse, Profile } from "@/types";

const isLoading = ref(false);
const isStale = ref(true);
const isRefreshing = ref(false);
const profile = reactive<Profile>({
    unit: ''
});

export function useProfile() {
    const { invoke } = useApi();

    const refresh = async (): Promise<Profile> => {
        isRefreshing.value = true;
        isLoading.value = true;

        const response = await invoke("/profile", {
            method: "GET",
        }).catch((x) => x);


        const json = await response.json();
        const result = json as Profile;
        profile.unit = result.unit;

        isLoading.value = false;
        isRefreshing.value = false;

        if (response.ok) {
            isStale.value = false;
        }

        return profile;
    };

    const edit = async (model: Profile): Promise<ApiResponse> => {
        isLoading.value = true;

        const response = await invoke("/profile", {
            method: "PATCH",
            body: JSON.stringify(model),
        }).catch((x) => x);

        isLoading.value = false;

        if (!response.ok) {
            return { success: false, error: response.statusText };
        }

        isStale.value = true;
        return { success: true, error: undefined };
    };

    if (isStale.value && !isRefreshing.value) {
        refresh();
    }

    return {
        isLoading,
        profile,
        edit,
    }
};