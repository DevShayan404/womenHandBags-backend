import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  categoryName: string;

  @ApiProperty()
  categoryImg: string;
}
