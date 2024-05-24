import { Injectable } from '@nestjs/common';
import { IsBoolean } from 'class-validator';

@Injectable()
export class PublishedDto {
  @IsBoolean()
  published: boolean;
}
