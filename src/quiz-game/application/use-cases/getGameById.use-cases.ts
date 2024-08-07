import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { QuizRepo } from '../../infrastructure/quiz.repo';
import { AuthService } from '../../../security/auth-service';
import { UsersRepo } from '../../../features/users/infrastructure/users-repo';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { GameModel } from '../../api/models/game.model';

export class GetGameByIdQuery {
  constructor(
    public token: string,
    public gameId: number,
  ) {}
}

@QueryHandler(GetGameByIdQuery)
export class GetGameByIdUseCase implements IQueryHandler<GetGameByIdQuery> {
  constructor(
    private readonly quizRepo: QuizRepo,
    private readonly usersRepo: UsersRepo,
    private readonly authService: AuthService,
  ) {}

  async execute(query: GetGameByIdQuery) {
    const userId = await this.authService.getUserIdFromAccessToken(query.token);

    const user = await this.usersRepo.checkUser(+userId);
    if (!user) throw new NotFoundException('user not found');

    const game = await this.getGame(query.gameId, userId);
    return this.getGameInformation(game.id);
  }

  async getGame(gameId: number, userId: number) {
    const game = await this.quizRepo.getGame(gameId);
    if (!game) throw new NotFoundException('Game not founded');

    if (
      game.scores[0].playerId !== userId ||
      game.scores[1].playerId !== userId
    ) {
      throw new ForbiddenException('not participant');
    }

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
