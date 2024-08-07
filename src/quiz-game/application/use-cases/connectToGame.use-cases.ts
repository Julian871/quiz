import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QuizRepo } from '../../infrastructure/quiz.repo';
import { AuthService } from '../../../security/auth-service';
import { UsersRepo } from '../../../features/users/infrastructure/users-repo';
import { Game } from '../../../entities/quiz/game-entity';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { PlayerScore } from '../../../entities/quiz/playerScore.entity';
import { GameModel } from '../../api/models/game.model';

export class ConnectGameCommand {
  constructor(public token: string) {}
}

@CommandHandler(ConnectGameCommand)
export class ConnectGameUseCase implements ICommandHandler<ConnectGameCommand> {
  constructor(
    private readonly quizRepo: QuizRepo,
    private readonly usersRepo: UsersRepo,
    private readonly authService: AuthService,
  ) {}

  async execute(command: ConnectGameCommand) {
    const userId = await this.authService.getUserIdFromAccessToken(
      command.token,
    );

    const user = await this.usersRepo.checkUser(+userId);
    if (!user) throw new NotFoundException('user not found');

    await this.checkCurrentUserOnActiveGame(user.id);

    const gameId = await this.createGame(user.id, user.login);

    return this.getGameInformation(gameId);
  }

  async createGame(userId: number, userLogin: string) {
    const pendingGame = await this.quizRepo.getPendingGame();
    if (!pendingGame) {
      const newGame = new Game();
      newGame.status = 'PendingSecondPlayer';

      await this.quizRepo.saveGame(newGame);

      const score = new PlayerScore();
      score.playerId = userId;
      score.playerLogin = userLogin;
      score.game = newGame;

      await this.quizRepo.saveScore(score);
      return newGame.id;
    } else {
      const questions = await this.quizRepo.getFiveQuestions();
      pendingGame.questionsId = questions.map((question) => question.id);
      pendingGame.status = 'Active';
      pendingGame.startedAt = new Date();
      const newScore = new PlayerScore();
      newScore.playerId = userId;
      newScore.playerLogin = userLogin;
      newScore.game = pendingGame;

      await this.quizRepo.saveGame(pendingGame);
      await this.quizRepo.saveScore(newScore);

      return pendingGame.id;
    }
  }

  async checkCurrentUserOnActiveGame(userId: number) {
    const check = await this.quizRepo.checkUserOnActiveGame(userId);
    if (check) {
      throw new ForbiddenException(
        'Current user is already participating in active pair',
      );
    }
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
