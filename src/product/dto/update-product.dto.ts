import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty()
  productName: string;

  @ApiProperty()
  productPrice: number;

  @ApiProperty()
  productQuantity: number;

  @ApiProperty()
  productCode: string;

  @ApiProperty()
  productWeight: number;

  @ApiProperty()
  productWidth: number;

  @ApiProperty()
  productHeight: number;

  @ApiProperty()
  productDescription: string;

  @ApiProperty()
  productImg: string;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  materialId: number;
}
