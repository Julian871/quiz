import { Injectable } from '@nestjs/common';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsString,
  Length,
} from 'class-validator';

@Injectable()
export class CreateQuestionDto {
  @Length(10, 500)
  body: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  answers: string[];
}
