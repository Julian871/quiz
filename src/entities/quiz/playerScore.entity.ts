import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Answers } from './answers-entity';
import { Game } from './game-entity';

@Entity({ name: 'Score' })
export class PlayerScore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  playerId: number;

  @Column({ type: 'varchar' })
  playerLogin: string;

  @Column({ type: 'int', nullable: true })
  currentQuestion: number;

  @OneToMany('Answers', 'owner')
  answers: Answers[];

  @ManyToOne('Game', 'scores')
  game: Game;
}
