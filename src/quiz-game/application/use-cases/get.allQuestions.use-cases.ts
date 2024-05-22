import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QuizQueryRepo } from '../../infrastructure/quiz.query.repo';
import { QuestionsQuery } from '../../api/query.questions';
import { PageInformation } from '../../../features/page-information';

export class GetQuestionCommand {
  constructor(public query: QuestionsQuery) {}
}

@CommandHandler(GetQuestionCommand)
export class GetQuestionsUseCases
  implements ICommandHandler<GetQuestionCommand>
{
  constructor(private readonly quizQueryRepo: QuizQueryRepo) {}

  async execute(command: GetQuestionCommand) {
    const [questions, count] = await this.quizQueryRepo.getAllQuestions(
      command.query,
    );

    const filterQuestions = questions.map((q) => {
      return {
        id: q.id,
        body: q.body,
        correctAnswers: q.answers,
        published: q.published,
        createdAt: q.createdAt,
        updatedAt: q.updatedAt,
      };
    });

    return new PageInformation(
      command.query.pageNumber,
      command.query.pageSize,
      count,
      filterQuestions,
    );
  }
}
