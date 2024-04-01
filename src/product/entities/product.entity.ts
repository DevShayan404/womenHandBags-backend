import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  productName: string;

  @Column()
  productPrice: number;

  @Column()
  productQuantity: number;

  @Column()
  productCode: string;

  @Column()
  productWeight: number;

  @Column()
  productWidth: number;

  @Column()
  productHeight: number;

  @Column()
  productDescription: string;

  @Column()
  productImg: string;

  @Column()
  categoryId: number;

  @Column()
  materialId: number;
}
