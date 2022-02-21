import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ExerciseEntity } from '@/exercise/exercise.entity';

@Entity('category')
export class CategoryEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true, nullable: false, })
  name: string;

  @OneToMany(() => ExerciseEntity, x => x.category)
  exercises: ExerciseEntity[];
  
}