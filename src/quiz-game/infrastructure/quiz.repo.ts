import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questions } from '../../entities/quiz/questions-entity';

@Injectable()
export class QuizRepo {
  constructor(
    @InjectRepository(Questions)
    private readonly usersRepository: Repository<Questions>,
  ) {}

  saveQuestion(question: Questions): Promise<Questions> {
    return this.usersRepository.save(question);
  }
}
