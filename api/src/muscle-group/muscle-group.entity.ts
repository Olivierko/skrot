import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ExerciseEntity } from '@/exercise/exercise.entity';

@Entity('muslce-group')
export class MuscleGroupEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false, })
  name: string;

  @OneToMany(() => ExerciseEntity, x => x.muscleGroup)
  exercises: ExerciseEntity[];

}