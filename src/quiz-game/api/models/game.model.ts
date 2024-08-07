import { Game } from '../../../entities/quiz/game-entity';
import { PlayerProgressModel } from './playerProgress.model';
import { Questions } from '../../../entities/quiz/questions-entity';
import { QuestionsType } from '../types/game.type';

export class GameModel {
  id: string;
  firstPlayerProgress: PlayerProgressModel;
  secondPlayerProgress: PlayerProgressModel | undefined;
  questions: QuestionsType | [];
  status: string;
  pairCreatedDate: string;
  startCreatedDate: string | null;
  finishCreatedDate: string | null;
  constructor(game: Game, questions: Questions[] | null) {
    this.id = game.id.toString();

    this.firstPlayerProgress = new PlayerProgressModel(game.scores[0]);
    if (game.scores.length === 2) {
      this.secondPlayerProgress = new PlayerProgressModel(game.scores[1]);
    } else {
      this.secondPlayerProgress = undefined;
    }

    if (questions === null) {
      this.questions = [];
    } else {
      this.questions = questions.map((q) => ({
        id: q.id.toString(),
        body: q.body,
      }));
    }

    this.status = game.status;

    this.pairCreatedDate = game.createdAt.toISOString();
    this.startCreatedDate = game.startedAt
      ? game.startedAt.toISOString()
      : null;
    this.finishCreatedDate = game.finishedAt
      ? game.finishedAt.toISOString()
      : null;
  }
}
