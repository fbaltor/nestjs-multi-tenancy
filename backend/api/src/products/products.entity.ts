import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('products')
export class Products {
  @PrimaryColumn()
  product_id: number;

  @Column()
  product_name: string;
}
