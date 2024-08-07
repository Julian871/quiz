import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BearerAuthGuard } from '../../security/auth-guard';
import { ConnectGameCommand } from '../application/use-cases/connectToGame.use-cases';
import { Request as Re } from 'express';
import { GetCurrentGameQuery } from '../application/use-cases/getCurrentGame.use-cases';
import { GetGameByIdQuery } from '../application/use-cases/getGameById.use-cases';

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

  @Get('/pairs/:id')
  @HttpCode(200)
  async getGameById(@Param('id') id: string, @Req() req: Re) {
    const gameId = parseInt(id, 10);
    if (!Number.isInteger(gameId) || gameId <= 0) {
      throw new BadRequestException('Некорректный gameId');
    }

    const token = req.headers.authorization!;
    return this.queryBus.execute(new GetGameByIdQuery(token, gameId));
  }
}
