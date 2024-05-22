import { Transform } from 'class-transformer';

export class QuestionsQuery {
  bodySearchTerm: string = '';
  sortBy: string = 'createdAt';

  @Transform(({ value }) => {
    if (value.toLowerCase() === 'published') {
      return true;
    } else if (value.toLowerCase() === 'notPublished') {
      return false;
    } else return 'all';
  })
  publishedStatus: string;

  @Transform(({ value }) => {
    if (value.toLowerCase() === 'asc') {
      return 'ASC';
    } else {
      return 'DESC';
    }
  })
  sortDirection: 'DESC' | 'ASC' = 'DESC';

  pageNumber: number = 1;
  pageSize: number = 10;
}
