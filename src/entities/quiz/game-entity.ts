import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PlayerScore } from './playerScore.entity';

@Entity({ name: 'Game' })
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'simple-json', nullable: true })
  questionsId: number[];

  @Column({ type: 'timestamp with time zone', default: new Date() })
  createdAt: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  startedAt: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  finishedAt: Date;

  @OneToMany('PlayerScore', 'game')
  scores: PlayerScore[];
}
