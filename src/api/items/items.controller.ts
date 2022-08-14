import {
  Controller,
  Get,
  Headers,
  HttpStatus,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { ItemsService } from './items.service';

@UseInterceptors(AuthInterceptor)
@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  async getItems(@Res() res: Response, @Headers('userId') userId: string) {
    const id = parseInt(userId);
    const items = await this.itemsService.getItems(id);
    res.status(HttpStatus.OK).json({ items });
  }
}
