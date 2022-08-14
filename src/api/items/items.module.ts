import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TokenService } from 'src/services/token/token.service';

@Module({
  providers: [ItemsService, TokenService],
  controllers: [ItemsController],
})
export class ItemsModule {}
