import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { ProfileEntity } from '@/profile/profile.entity';
import { WorkoutEntity } from '@/workout/workout.entity';

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    refreshToken?: string;

    @Column({ nullable: true })
    profileId: string;
  
    @OneToOne(() => ProfileEntity, x => x.user)
    profile?: ProfileEntity;

    @OneToMany(() => WorkoutEntity, x => x.user)
    workouts: WorkoutEntity[];

}