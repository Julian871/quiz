import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questions } from '../../entities/quiz/questions-entity';
import { QuestionsQuery } from '../api/query.questions';

@Injectable()
export class QuizQueryRepo {
  constructor(
    @InjectRepository(Questions)
    private readonly questionRepo: Repository<Questions>,
  ) {}

  async getAllQuestions(query: QuestionsQuery) {
    const queryBuilder = this.questionRepo
      .createQueryBuilder('q')
      .where('q.body ILIKE :bodySearchTerm', {
        bodySearchTerm: `%${query.bodySearchTerm}%`,
      });

    if (query.publishedStatus !== 'all') {
      queryBuilder.andWhere('q.published = :publishedSearch', {
        publishedSearch: query.publishedStatus === 'true',
      });
    }

    return queryBuilder
      .orderBy(`q.${query.sortBy}`, query.sortDirection)
      .skip((query.pageNumber - 1) * query.pageSize)
      .take(query.pageSize)
      .getManyAndCount();
  }
}
