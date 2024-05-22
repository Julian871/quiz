import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BasicAuthGuard } from '../../security/auth-guard';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { CreateQuestionCommand } from '../application/use-cases/create.question.use-cases';
import { QuestionsQuery } from './query.questions';
import { GetQuestionCommand } from '../application/use-cases/get.allQuestions.use-cases';

@UseGuards(BasicAuthGuard)
@Controller('sa/quiz')
export class SaQuizController {
  constructor(private commandBus: CommandBus) {}

  @Post('/questions')
  @HttpCode(201)
  async createQuestion(@Body() dto: CreateQuestionDto) {
    await this.commandBus.execute(new CreateQuestionCommand(dto));
  }

  @Get('/questions')
  @HttpCode(200)
  async getQuestions(@Query() query: QuestionsQuery) {
    return this.commandBus.execute(new GetQuestionCommand(query));
  }
}
