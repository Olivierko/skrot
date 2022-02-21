import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthModule } from '@/auth/auth.module';
import { ProfileModule } from '@/profile/profile.module';
import { UserModule } from '@/user/user.module';
import { WorkoutModule } from '@/workout/workout.module';
import { CategoryModule } from '@/category/category.module';
import { ExerciseModule } from '@/exercise/exercise.module';
import { MuscleGroupModule } from '@/muscle-group/muscle-group.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    ProfileModule,
    UserModule,
    WorkoutModule,
    CategoryModule,
    ExerciseModule,
    MuscleGroupModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
