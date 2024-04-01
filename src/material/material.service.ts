import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Material } from './entities/material.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepo: Repository<Material>,
  ) {}

  async create(createMaterialDto: CreateMaterialDto): Promise<Material> {
    if (!createMaterialDto.materialName) {
      throw new HttpException('Fields is required', HttpStatus.BAD_REQUEST);
    }

    let material: Material = new Material();
    material.materialName = createMaterialDto.materialName;
    await this.materialRepo.save(material);
    throw new HttpException('Material add successfully', HttpStatus.CREATED);
  }

  async findAll(): Promise<ApiResponse<Material[]>> {
    let material = await this.materialRepo.find();
    if (!material || material.length === 0) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Categories not found',
        data: material,
      };
    }
    // Sort products by categoryId
    material.sort((a, b) => a.materialId - b.materialId);
    return {
      statusCode: HttpStatus.FOUND,
      message: 'Fetch successfuly.',
      data: material,
    };
  }

  async update(
    id: number,
    updateMaterialDto: UpdateMaterialDto,
  ): Promise<Material> {
    if (!updateMaterialDto.materialName) {
      throw new HttpException('Fields is required', HttpStatus.BAD_REQUEST);
    }

    let material: Material = new Material();
    material.materialName = updateMaterialDto.materialName;
    material.materialId = id;
    await this.materialRepo.save(material);
    throw new HttpException('Material update successfully', HttpStatus.CREATED);
  }

  async remove(id: number): Promise<Material> {
    const category = await this.materialRepo.findOneBy({
      materialId: id,
    });
    if (!category) {
      throw new HttpException('Material not found.', HttpStatus.NOT_FOUND);
    }

    await this.materialRepo.delete({
      materialId: id,
    });
    throw new HttpException('Material deleted successfully.', HttpStatus.OK);
  }
}
