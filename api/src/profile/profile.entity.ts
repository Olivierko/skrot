import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { UserEntity } from '@/user/user.entity';

@Entity('profile')
export class ProfileEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  unit: string;
  
  @Column()
  userId: string;

  @OneToOne(() => UserEntity, x => x.profile)
  user: UserEntity;
  
}