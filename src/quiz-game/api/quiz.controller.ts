import { Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BearerAuthGuard } from '../../security/auth-guard';
import { ConnectGameCommand } from '../application/use-cases/connectToGame.use-cases';
import { Request as Re } from 'express';

@UseGuards(BearerAuthGuard)
@Controller('pair-game-quiz')
export class QuizController {
  constructor(private commandBus: CommandBus) {}

  @Post('/pairs/connection')
  @HttpCode(200)
  async createQuestion(@Req() req: Re) {
    const token = req.headers.authorization!;
    return this.commandBus.execute(new ConnectGameCommand(token));
  }
}
