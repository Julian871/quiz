import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from '../entities/quiz/questions-entity';
import { SaQuizController } from './api/sa_quiz.controller';
import { QuizRepo } from './infrastructure/quiz.repo';
import { QuizQueryRepo } from './infrastructure/quiz.query.repo';
import { useCases } from './application/use-cases/use-cases';
import { Game } from '../entities/quiz/game-entity';
import { Answers } from '../entities/quiz/answers-entity';
import { QuizController } from './api/quiz.controller';
import { UsersRepo } from '../features/users/infrastructure/users-repo';
import { AuthService } from '../security/auth-service';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from '../features/users/users.module';
import { PlayerScore } from '../entities/quiz/playerScore.entity';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Questions, Game, Answers, PlayerScore]),
    UsersModule,
  ],
  providers: [
    ...useCases,
    QuizRepo,
    QuizQueryRepo,
    UsersRepo,
    AuthService,
    JwtService,
  ],
  controllers: [SaQuizController, QuizController],
  exports: [TypeOrmModule],
})
export class QuizModule {}
