import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Questions } from '../../entities/quiz/questions-entity';
import { Game } from '../../entities/quiz/game-entity';
import { PlayerScore } from '../../entities/quiz/playerScore.entity';

@Injectable()
export class QuizRepo {
  constructor(
    @InjectRepository(Questions)
    private readonly questionRepo: Repository<Questions>,

    @InjectRepository(Game)
    private readonly gameRepo: Repository<Game>,

    @InjectRepository(PlayerScore)
    private readonly scoreRepo: Repository<PlayerScore>,
  ) {}

  saveQuestion(question: Questions): Promise<Questions> {
    return this.questionRepo.save(question);
  }

  saveGame(game: Game): Promise<Game> {
    return this.gameRepo.save(game);
  }

  saveScore(score: PlayerScore): Promise<PlayerScore> {
    return this.scoreRepo.save(score);
  }

  getQuestionById(id: number): Promise<Questions | null> {
    return this.questionRepo.findOneBy({ id });
  }

  getManyQuestionById(ids: number[]): Promise<Questions[] | null> {
    return this.questionRepo.find({
      where: { id: In(ids) },
    });
  }

  deleteQuestionById(id: number) {
    return this.questionRepo.delete({ id });
  }

  getPendingGame(): Promise<Game | null> {
    return this.gameRepo
      .createQueryBuilder('g')
      .leftJoinAndSelect('g.scores', 'scores')
      .leftJoinAndSelect('scores.answers', 'answers')
      .where('g.status = :status', { status: 'PendingSecondPlayer' })
      .getOne();
  }

  checkUserOnActiveGame(userId: number) {
    return this.gameRepo
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.scores', 'scores')
      .where('scores.playerId = :userId', { userId })
      .andWhere('game.status = :status', { status: 'Active' })
      .getOne();
  }

  getGame(gameId: number) {
    return this.gameRepo
      .createQueryBuilder('g')
      .leftJoinAndSelect('g.scores', 'scores')
      .leftJoinAndSelect('scores.answers', 'answers')
      .where('g.id = :gameId', { gameId })
      .getOne();
  }

  getFiveQuestions() {
    return this.questionRepo
      .createQueryBuilder('q')
      .select('q.id')
      .limit(5)
      .getMany();
  }
}
