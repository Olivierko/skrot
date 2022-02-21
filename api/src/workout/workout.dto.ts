export class WorkoutDto {
    start: Date;
    end: Date;
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