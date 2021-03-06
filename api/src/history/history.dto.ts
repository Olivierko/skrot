export class HistoryExerciseDto {
    date: Date;
    totalWeight: Number;
    totalSets: Number;
    totalRepititions: Number;
    unit: String;
    notes: String[];
}

export class HistoryWorkoutDto {
    start: Date;
    end: Date;
}