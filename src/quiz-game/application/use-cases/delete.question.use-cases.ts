import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QuizRepo } from '../../infrastructure/quiz.repo';
import { NotFoundException } from '@nestjs/common';

export class DeleteQuestionCommand {
  constructor(public questionId: number) {}
}

@CommandHandler(DeleteQuestionCommand)
export class DeleteQuestionUseCase
  implements ICommandHandler<DeleteQuestionCommand>
{
  constructor(private readonly quizRepo: QuizRepo) {}

  async execute(command: DeleteQuestionCommand) {
    const isDelete = await this.quizRepo.deleteQuestionById(command.questionId);
    if (isDelete.affected === 0) throw new NotFoundException();
    return;
  }
}
