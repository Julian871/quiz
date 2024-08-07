import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BearerAuthGuard } from '../../security/auth-guard';
import { ConnectGameCommand } from '../application/use-cases/connectToGame.use-cases';
import { Request as Re } from 'express';
import { GetCurrentGameQuery } from '../application/use-cases/getCurrentGame.use-cases';

@UseGuards(BearerAuthGuard)
@Controller('pair-game-quiz')
export class QuizController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post('/pairs/connection')
  @HttpCode(200)
  async createQuestion(@Req() req: Re) {
    const token = req.headers.authorization!;
    return this.commandBus.execute(new ConnectGameCommand(token));
  }

  @Get('/pairs/my-current')
  @HttpCode(200)
  async getCurrentGame(@Req() req: Re) {
    const token = req.headers.authorization!;
    return this.queryBus.execute(new GetCurrentGameQuery(token));
  }
}
