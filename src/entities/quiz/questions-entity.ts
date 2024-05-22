import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Questions' })
export class Questions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  body: string;

  @Column({ type: 'json' })
  answers: string[];

  @Column({ type: 'boolean', default: false })
  published: boolean;

  @Column({ type: 'timestamp with time zone', default: new Date() })
  createdAt: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  updatedAt: Date;
}
