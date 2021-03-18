import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TenancyModule } from '../tenancy/tenancy.module';
import { Products } from './products.entity';

@Module({
  imports: [TenancyModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
