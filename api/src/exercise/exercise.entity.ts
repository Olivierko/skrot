import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { CategoryEntity } from '@/category/category.entity';
import { MuscleGroupEntity } from '@/muscle-group/muscle-group.entity';
import { ExerciseEntryEntity } from '@/workout/workout.entity';

@Entity('exercise')
export class ExerciseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, })
  name: string;

  @Column()
  description: string;

  @Column()
  categoryId: string;

  @ManyToOne(() => CategoryEntity, x => x.exercises)
  category: CategoryEntity;

  @Column()
  muscleGroupId: string;

  @ManyToOne(() => MuscleGroupEntity, x => x.exercises)
  muscleGroup: MuscleGroupEntity;

  @OneToMany(() => ExerciseEntryEntity, x => x.exercise)
  entries: ExerciseEntryEntity[];

}