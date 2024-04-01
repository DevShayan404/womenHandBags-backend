import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMaterialDto } from './create-material.dto';

export class UpdateMaterialDto extends PartialType(CreateMaterialDto) {
  @ApiProperty()
  materialName: string;
}
