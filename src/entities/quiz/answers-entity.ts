import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PlayerScore } from './playerScore.entity';

@Entity({ name: 'Answers' })
export class Answers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  questionId: number;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'timestamp with time zone', default: new Date() })
  addedAt: Date;

  @ManyToOne('PlayerScore', 'answers')
  owner: PlayerScore;
}
