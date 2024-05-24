import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BasicAuthGuard } from '../../security/auth-guard';
import { QuestionDto } from './dto/question.dto';
import { CreateQuestionCommand } from '../application/use-cases/create.question.use-cases';
import { QuestionsQuery } from './query.questions';
import { GetQuestionCommand } from '../application/use-cases/get.questions.use-cases';
import { UpdateQuestionCommand } from '../application/use-cases/update.question.use-cases';
import { UpdatePublishedQuestionCommand } from '../application/use-cases/update.published.question.use-cases';
import { PublishedDto } from './dto/published.dto';
import { DeleteQuestionCommand } from '../application/use-cases/delete.question.use-cases';

@UseGuards(BasicAuthGuard)
@Controller('sa/quiz')
export class SaQuizController {
  constructor(private commandBus: CommandBus) {}

  @Post('/questions')
  @HttpCode(201)
  async createQuestion(@Body() dto: QuestionDto) {
    await this.commandBus.execute(new CreateQuestionCommand(dto));
  }

  @Get('/questions')
  @HttpCode(200)
  async getQuestions(@Query() query: QuestionsQuery) {
    return this.commandBus.execute(new GetQuestionCommand(query));
  }

  @Put('/questions/:id')
  @HttpCode(204)
  async updateQuestion(
    @Body() dto: QuestionDto,
    @Param('id') questionId: number,
  ) {
    await this.commandBus.execute(new UpdateQuestionCommand(dto, questionId));
  }

  @Put('/questions/:id/publish')
  @HttpCode(204)
  async publishedQuestion(
    @Body() dto: PublishedDto,
    @Param('id') questionId: number,
  ) {
    await this.commandBus.execute(
      new UpdatePublishedQuestionCommand(dto.published, questionId),
    );
  }

  @Delete('/questions/:id')
  @HttpCode(204)
  async deleteQuestion(@Param('id') questionId: number) {
    await this.commandBus.execute(new DeleteQuestionCommand(questionId));
  }
}
