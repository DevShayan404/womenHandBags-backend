import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
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
