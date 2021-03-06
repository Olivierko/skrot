export class WorkoutDto {
    start: Date;
    end: Date;
    name: string;
    exercises: Array<ExerciseEntryDto>;
}

export class ExerciseEntryDto {
    exerciseId: string;
    notes: string;
    sets: Array<ExerciseSetEntryDto>;
}

export class ExerciseSetEntryDto {
    repititions: number;
    weight: number;
    unit: string;
}

export class WorkoutListDto {
    id: string;
    userId: string;
    start: Date;
    end: Date;
    name: string;
    muscleGroups: string[];
}