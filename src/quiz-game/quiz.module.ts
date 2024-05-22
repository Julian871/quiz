import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from '../entities/quiz/questions-entity';
import { CreateQuestionUseCase } from './application/use-cases/create.question.use-cases';
import { SaQuizController } from './api/sa_quiz.controller';
import { QuizRepo } from './infrastructure/quiz.repo';
import { GetQuestionsUseCases } from './application/use-cases/get.allQuestions.use-cases';
import { QuizQueryRepo } from './infrastructure/quiz.query.repo';

const useCases = [CreateQuestionUseCase, GetQuestionsUseCases];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Questions])],
  providers: [...useCases, QuizRepo, QuizQueryRepo],
  controllers: [SaQuizController],
  exports: [TypeOrmModule],
})
export class QuizModule {}
