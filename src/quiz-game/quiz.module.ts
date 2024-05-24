import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from '../entities/quiz/questions-entity';
import { CreateQuestionUseCase } from './application/use-cases/create.question.use-cases';
import { SaQuizController } from './api/sa_quiz.controller';
import { QuizRepo } from './infrastructure/quiz.repo';
import { QuizQueryRepo } from './infrastructure/quiz.query.repo';
import { GetQuestionsUseCase } from './application/use-cases/get.questions.use-cases';
import { UpdateQuestionUseCase } from './application/use-cases/update.question.use-cases';
import { UpdatePublishedQuestionUseCase } from './application/use-cases/update.published.question.use-cases';
import { DeleteQuestionUseCase } from './application/use-cases/delete.question.use-cases';

const useCases = [
  CreateQuestionUseCase,
  GetQuestionsUseCase,
  UpdateQuestionUseCase,
  UpdatePublishedQuestionUseCase,
  DeleteQuestionUseCase,
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Questions])],
  providers: [...useCases, QuizRepo, QuizQueryRepo],
  controllers: [SaQuizController],
  exports: [TypeOrmModule],
})
export class QuizModule {}
