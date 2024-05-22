import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateQuestionDto } from '../../api/dto/createQuestion.dto';
import { QuizRepo } from '../../infrastructure/quiz.repo';
import { Questions } from '../../../entities/quiz/questions-entity';

export class CreateQuestionCommand {
  constructor(public dto: CreateQuestionDto) {}
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
  }
}
