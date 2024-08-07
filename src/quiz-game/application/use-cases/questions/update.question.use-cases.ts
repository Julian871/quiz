import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QuizRepo } from '../../../infrastructure/quiz.repo';
import { QuestionDto } from '../../../api/dto/question.dto';
import { NotFoundException } from '@nestjs/common';

export class UpdateQuestionCommand {
  constructor(
    public dto: QuestionDto,
    public questionId: number,
  ) {}
}

@CommandHandler(UpdateQuestionCommand)
export class UpdateQuestionUseCase
  implements ICommandHandler<UpdateQuestionCommand>
{
  constructor(private readonly quizRepo: QuizRepo) {}

  async execute(command: UpdateQuestionCommand) {
    const question = await this.quizRepo.getQuestionById(command.questionId);
    if (!question) throw new NotFoundException();

    question.body = command.dto.body;
    question.answers = command.dto.answers;
    question.updatedAt = new Date();

    await this.quizRepo.saveQuestion(question);
  }
}
