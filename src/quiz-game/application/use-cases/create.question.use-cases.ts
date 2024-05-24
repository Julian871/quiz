import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QuizRepo } from '../../infrastructure/quiz.repo';
import { Questions } from '../../../entities/quiz/questions-entity';
import { QuestionDto } from '../../api/dto/question.dto';

export class CreateQuestionCommand {
  constructor(public dto: QuestionDto) {}
}

@CommandHandler(CreateQuestionCommand)
export class CreateQuestionUseCase
  implements ICommandHandler<CreateQuestionCommand>
{
  constructor(private readonly quizRepo: QuizRepo) {}

  async execute(command: CreateQuestionCommand) {
    const newQuestion = new Questions();
    newQuestion.body = command.dto.body;
    newQuestion.answers = command.dto.answers;
    await this.quizRepo.saveQuestion(newQuestion);

    return {
      id: newQuestion.id,
      body: newQuestion.body,
      correctAnswers: newQuestion.answers,
      published: newQuestion.published,
      createdAt: newQuestion.createdAt,
      updatedAt: newQuestion.updatedAt,
    };
  }
}
