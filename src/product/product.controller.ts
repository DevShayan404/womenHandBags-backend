import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('createProduct')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('getAllDetailProduct')
  findAll() {
    return this.productService.findAll();
  }

  @Get('getProductById/:id')
  findById(@Param('id') id: string) {
    return this.productService.findById(+id);
  }

  @Patch('updateProduct/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete('deleteProduct/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
