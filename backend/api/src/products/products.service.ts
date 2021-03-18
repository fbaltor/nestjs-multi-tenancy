import { Injectable, Inject, Scope } from '@nestjs/common';
import { Repository, getRepository } from 'typeorm';
import { Products } from './products.entity';

@Injectable({ scope: Scope.REQUEST })
export class ProductsService {
  private readonly productsRepository: Repository<Products>;
  constructor(@Inject('CONNECTION') connection) {
    this.productsRepository = connection.getRepository(Products);
  }

  async getData(): Promise<Products[]> {
    const data = await this.productsRepository.find({});
    return data;
  }
}
