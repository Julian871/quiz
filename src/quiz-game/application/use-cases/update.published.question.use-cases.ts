import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QuizRepo } from '../../infrastructure/quiz.repo';
import { NotFoundException } from '@nestjs/common';

export class UpdatePublishedQuestionCommand {
  constructor(
    public published: boolean,
    public questionId: number,
  ) {}
}

@CommandHandler(UpdatePublishedQuestionCommand)
export class UpdatePublishedQuestionUseCase
  implements ICommandHandler<UpdatePublishedQuestionCommand>
{
  constructor(private readonly quizRepo: QuizRepo) {}

  async execute(command: UpdatePublishedQuestionCommand) {
    const question = await this.quizRepo.getQuestionById(command.questionId);
    if (!question) throw new NotFoundException();

    question.published = command.published;
    question.updatedAt = new Date();

    await this.quizRepo.saveQuestion(question);
  }
}
