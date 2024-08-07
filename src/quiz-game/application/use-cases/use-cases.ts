import { CreateQuestionUseCase } from './questions/create.question.use-cases';
import { GetQuestionsUseCase } from './questions/get.questions.use-cases';
import { UpdateQuestionUseCase } from './questions/update.question.use-cases';
import { UpdatePublishedQuestionUseCase } from './questions/update.published.question.use-cases';
import { DeleteQuestionUseCase } from './questions/delete.question.use-cases';
import { ConnectGameUseCase } from './connectToGame.use-cases';
import { GetCurrentGameUseCase } from './getCurrentGame.use-cases';

export const useCases = [
  CreateQuestionUseCase,
  GetQuestionsUseCase,
  UpdateQuestionUseCase,
  UpdatePublishedQuestionUseCase,
  DeleteQuestionUseCase,
  ConnectGameUseCase,
  GetCurrentGameUseCase,
];
