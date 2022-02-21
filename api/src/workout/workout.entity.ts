import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '@/user/user.entity';
import { ExerciseEntity } from '@/exercise/exercise.entity';

@Entity('workout')
export class WorkoutEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, x => x.workouts)
  user: UserEntity;

  @Column({ type: 'datetime' })
  start: Date;

  @Column({ type: 'datetime' })
  end: Date;

  @OneToMany(() => ExerciseEntryEntity, x => x.workout, { cascade: true })
  exercises: ExerciseEntryEntity[];

}

@Entity('exercise-entry')
export class ExerciseEntryEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  workoutId: string;

  @ManyToOne(() => WorkoutEntity, x => x.exercises, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
  workout: WorkoutEntity;

  @Column()
  exerciseId: string;

  @ManyToOne(() => ExerciseEntity, x => x.entries)
  exercise: ExerciseEntity;

  @Column()
  notes: string;

  @Column()
  order: number;

  @OneToMany(() => ExerciseSetEntryEntity, x => x.entry, { cascade: true })
  sets: ExerciseSetEntryEntity[];

}

@Entity('exercise-set-entry')
export class ExerciseSetEntryEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  repititions: number;

  @Column()
  weight: number;

  @Column()
  unit: string;

  @Column()
  order: number;

  @Column()
  entryId: string;

  @ManyToOne(() => ExerciseEntryEntity, x => x.sets, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
  entry: ExerciseEntryEntity;

}