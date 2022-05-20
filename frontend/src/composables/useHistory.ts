import { useApi } from "@/composables/useApi";
import { ExerciseHistory } from "@/types";

export function useHistory() {
    const { invoke } = useApi();

    const getExerciseHistory = async (id: string): Promise<ExerciseHistory[]> => {
        const params = new URLSearchParams({
            id: id
        });

        const response = await invoke("/history/exercise", {
            method: "GET",
        }, params).catch((x) => x);

        const json = await response.json();
        const result = json as ExerciseHistory[];

        return result;
    };

    return {
        getExerciseHistory,
    }
};