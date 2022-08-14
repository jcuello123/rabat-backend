import { Injectable } from '@nestjs/common';
import { Item } from '@prisma/client';
import { getItems } from 'src/util/prisma.util';

@Injectable()
export class ItemsService {
  async getItems(userId: number): Promise<Item[]> {
    return await getItems(userId);
  }
}
