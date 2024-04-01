import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Material } from 'src/material/entities/material.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    if (
      !createProductDto.productName ||
      !createProductDto.productImg ||
      !createProductDto.categoryId ||
      !createProductDto.materialId ||
      !createProductDto.productCode ||
      !createProductDto.productDescription ||
      !createProductDto.productHeight ||
      !createProductDto.productPrice ||
      !createProductDto.productQuantity ||
      !createProductDto.productWeight ||
      !createProductDto.productWidth
    ) {
      throw new HttpException('Fields is required', HttpStatus.BAD_REQUEST);
    }

    let product: Product = new Product();

    product.productName = createProductDto.productName;
    product.productPrice = createProductDto.productPrice;
    product.productCode = createProductDto.productCode;
    product.productDescription = createProductDto.productDescription;
    product.productQuantity = createProductDto.productQuantity;
    product.productWeight = createProductDto.productWeight;
    product.productWidth = createProductDto.productWidth;
    product.productHeight = createProductDto.productHeight;
    product.productImg = createProductDto.productImg;
    product.categoryId = createProductDto.categoryId;
    product.materialId = createProductDto.materialId;
    await this.productRepository.save(product);
    throw new HttpException('Product add successfully', HttpStatus.CREATED);
  }

  async findAll(): Promise<ApiResponse<any[]>> {
    let products = await this.productRepository.find();
    if (!products || products.length === 0) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Product not found',
        data: products,
      };
    }

    // Fetch brand details for each product item
    let nestedProduct = await Promise.all(
      products.map(async (product) => {
        let category = await this.categoryRepository.findOneBy({
          categoryId: +product.categoryId,
        });
        let material = await this.materialRepository.findOneBy({
          materialId: +product.materialId,
        });
        return {
          productId: product.productId,
          productName: product.productName,
          productPrice: product.productPrice,
          productQuantity: product.productQuantity,
          productCode: product.productCode,
          productWeight: product.productWeight,
          productWidth: product.productWidth,
          productHeight: product.productHeight,
          productDescription: product.productDescription,
          productImg: product.productImg,
          category: [category],
          material: [material],
        };
      }),
    );

    // Sort products by productId
    nestedProduct.sort((a, b) => a.productId - b.productId);

    return {
      statusCode: HttpStatus.FOUND,
      message: 'Fetch successfully.',
      data: nestedProduct,
    };
  }

  async findById(id: number): Promise<ApiResponse<any[]>> {
    const productById = await this.productRepository.findOneBy({
      productId: id,
    });

    if (!productById) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Product not found',
        data: [productById],
      };
    }

    let category = await this.categoryRepository.findOneBy({
      categoryId: +productById.categoryId,
    });
    let material = await this.materialRepository.findOneBy({
      materialId: +productById.materialId,
    });
    const nestedProduct = {
      productId: productById.productId,
      productName: productById.productName,
      productPrice: productById.productPrice,
      productQuantity: productById.productQuantity,
      productCode: productById.productCode,
      productWeight: productById.productWeight,
      productWidth: productById.productWidth,
      productHeight: productById.productHeight,
      productDescription: productById.productDescription,
      productImg: productById.productImg,
      category: [category],
      material: [material],
    };

    return {
      statusCode: HttpStatus.FOUND,
      message: 'Fetch successfully.',
      data: [nestedProduct],
    };
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    if (
      !updateProductDto.productName ||
      !updateProductDto.productImg ||
      !updateProductDto.categoryId ||
      !updateProductDto.materialId ||
      !updateProductDto.productCode ||
      !updateProductDto.productDescription ||
      !updateProductDto.productHeight ||
      !updateProductDto.productPrice ||
      !updateProductDto.productQuantity ||
      !updateProductDto.productWeight ||
      !updateProductDto.productWidth
    ) {
      throw new HttpException('Fields is required', HttpStatus.BAD_REQUEST);
    }
    let updateProduct: Product = new Product();
    updateProduct.productName = updateProductDto.productName;
    updateProduct.productPrice = updateProductDto.productPrice;
    updateProduct.productCode = updateProductDto.productCode;
    updateProduct.productDescription = updateProductDto.productDescription;
    updateProduct.productQuantity = updateProductDto.productQuantity;
    updateProduct.productWeight = updateProductDto.productWeight;
    updateProduct.productWidth = updateProductDto.productWidth;
    updateProduct.productHeight = updateProductDto.productHeight;
    updateProduct.productImg = updateProductDto.productImg;
    updateProduct.categoryId = updateProductDto.categoryId;
    updateProduct.materialId = updateProductDto.materialId;
    updateProduct.productId = id;
    await this.productRepository.save(updateProduct);
    throw new HttpException('Product update successfully', HttpStatus.CREATED);
  }

  async remove(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({
      productId: id,
    });
    if (!product) {
      throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);
    }

    await this.productRepository.delete({
      productId: id,
    });
    throw new HttpException('Product deleted successfully.', HttpStatus.OK);
  }
}
