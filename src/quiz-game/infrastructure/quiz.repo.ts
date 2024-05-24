import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questions } from '../../entities/quiz/questions-entity';

@Injectable()
export class QuizRepo {
  constructor(
    @InjectRepository(Questions)
    private readonly questionRepo: Repository<Questions>,
  ) {}

  saveQuestion(question: Questions): Promise<Questions> {
    return this.questionRepo.save(question);
  }

  getQuestionById(id: number): Promise<Questions | null> {
    return this.questionRepo.findOneBy({ id });
  }

  deleteQuestionById(id: number) {
    return this.questionRepo.delete({ id });
  }
}
