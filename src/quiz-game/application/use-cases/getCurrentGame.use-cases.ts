import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { QuizRepo } from '../../infrastructure/quiz.repo';
import { AuthService } from '../../../security/auth-service';
import { UsersRepo } from '../../../features/users/infrastructure/users-repo';
import { NotFoundException } from '@nestjs/common';
import { GameModel } from '../../api/models/game.model';

export class GetCurrentGameQuery {
  constructor(public token: string) {}
}

@QueryHandler(GetCurrentGameQuery)
export class GetCurrentGameUseCase
  implements IQueryHandler<GetCurrentGameQuery>
{
  constructor(
    private readonly quizRepo: QuizRepo,
    private readonly usersRepo: UsersRepo,
    private readonly authService: AuthService,
  ) {}

  async execute(query: GetCurrentGameQuery) {
    const userId = await this.authService.getUserIdFromAccessToken(query.token);

    const user = await this.usersRepo.checkUser(+userId);
    if (!user) throw new NotFoundException('user not found');

    const game = await this.getGame(userId);
    return this.getGameInformation(game.id);
  }

  async getGame(userId: number) {
    const game = await this.quizRepo.getActiveGameByUserId(userId);
    if (!game) throw new NotFoundException('No active game');
    return game;
  }

  async getGameInformation(gameId: number) {
    const game = await this.quizRepo.getGame(gameId);
    if (!game) throw new NotFoundException('not found game');
    const questions =
      game.questionsId === null
        ? null
        : await this.quizRepo.getManyQuestionById(game.questionsId);

    return new GameModel(game, questions);
  }
}
