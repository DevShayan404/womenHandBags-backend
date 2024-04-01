import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
// 
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    if (!createCategoryDto.categoryName || !createCategoryDto.categoryImg) {
      throw new HttpException('Fields is required', HttpStatus.BAD_REQUEST);
    }

    let category: Category = new Category();
    category.categoryName = createCategoryDto.categoryName;
    category.categoryImg = createCategoryDto.categoryImg;
    await this.categoryRepository.save(category);
    throw new HttpException('Category add successfully.', HttpStatus.CREATED);
  }

  async findAll(): Promise<ApiResponse<Category[]>> {
    let categories = await this.categoryRepository.find();
    if (!categories || categories.length === 0) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Categories not found',
        data: categories,
      };
    }
    // Sort products by categoryId
    categories.sort((a, b) => a.categoryId - b.categoryId);
    return {
      statusCode: HttpStatus.FOUND,
      message: 'Fetch successfuly.',
      data: categories,
    };
  }

  // async findOne(id: number): Promise<Category> {
  //   const category = await this.categoryRepository.findOneBy({
  //     categoryId: id,
  //   });
  //   if (!category) {
  //     throw new HttpException('No category found.', HttpStatus.NOT_FOUND);
  //   }
  //   return category;
  // }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    if (!updateCategoryDto.categoryName || !updateCategoryDto.categoryImg) {
      throw new HttpException('Fields is required', HttpStatus.BAD_REQUEST);
    }

    let updateCategory: Category = new Category();
    updateCategory.categoryName = updateCategoryDto.categoryName;
    updateCategory.categoryImg = updateCategoryDto.categoryImg;
    updateCategory.categoryId = id;
    await this.categoryRepository.save(updateCategory);

    throw new HttpException(
      'Category update successfully.',
      HttpStatus.CREATED,
    );
  }

  async remove(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({
      categoryId: id,
    });
    if (!category) {
      throw new HttpException('Category not found.', HttpStatus.NOT_FOUND);
    }

    await this.categoryRepository.delete({
      categoryId: id,
    });
    throw new HttpException('Category deleted successfully.', HttpStatus.OK);
  }
}
