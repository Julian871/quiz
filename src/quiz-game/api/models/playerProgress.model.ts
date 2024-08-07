import { PlayerScore } from '../../../entities/quiz/playerScore.entity';
import { AnswersType, PlayerType } from '../types/game.type';

export class PlayerProgressModel {
  answers: AnswersType;
  player: PlayerType;
  score: number;

  constructor(score: PlayerScore) {
    this.answers = score.answers.map((answer) => ({
      questionId: answer.questionId,
      answerStatus: answer.status,
      addedAt: answer.addedAt.toISOString(),
    }));

    this.player = {
      id: score.playerId.toString(),
      login: score.playerLogin,
    };

    this.score = score.answers.length;
  }
}
