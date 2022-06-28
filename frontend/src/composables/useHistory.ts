import { useApi } from "@/composables/useApi";
import { ExerciseHistory, WorkoutHistory } from "@/types";

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

    const getWorkoutHistory = async (since: Date): Promise<WorkoutHistory[]> => {
        const params = new URLSearchParams({
            since: since.toISOString()
        });

        const response = await invoke("/history/workouts", {
            method: "GET",
        }, params).catch((x) => x);

        const json = await response.json();
        const result = json as WorkoutHistory[];

        return result;
    };

    return {
        getExerciseHistory,
        getWorkoutHistory,
    }
};