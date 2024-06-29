import { HttpMessage } from './../../global/globalEnum';
import { ResponseData } from 'src/global/globalClass';
import { ProductService } from './product.service';
import { Controller, Get, Post, Put, Delete, HttpStatus, Param, Body } from '@nestjs/common';
import { Product } from 'src/models/product.model';
import { ProductDto } from 'src/dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProduct(): ResponseData<Product[]> {
    try {
      return new ResponseData<Product[]>(this.productService.getProduct(), HttpStatus.OK, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Product[]>(null, HttpStatus.BAD_REQUEST, HttpMessage.ERROR);
    }
  }

  @Post()
  createProduct(@Body() productDto: ProductDto): ResponseData<Product> {
    try {
      return new ResponseData<Product>(
        this.productService.createProduct(productDto),
        HttpStatus.OK,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product>(null, HttpStatus.BAD_REQUEST, HttpMessage.ERROR);
    }
  }

  @Get(':id')
  detailProduct(@Param('id') id: string): ResponseData<Product> {
    try {
      return new ResponseData<Product>(
        this.productService.detailProduct(parseInt(id)),
        HttpStatus.OK,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product>(null, HttpStatus.BAD_REQUEST, HttpMessage.ERROR);
    }
  }

  @Put('/:id')
  updateProduct(@Body() productDto: ProductDto, @Param('id') id: string): ResponseData<Product> {
    try {
      return new ResponseData<Product>(
        this.productService.updateProduct(parseInt(id), productDto),
        HttpStatus.OK,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product>(null, HttpStatus.BAD_REQUEST, HttpMessage.ERROR);
    }
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string): ResponseData<boolean> {
    try {
      return new ResponseData<boolean>(
        this.productService.deleteProduct(parseInt(id)),
        HttpStatus.OK,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<boolean>(null, HttpStatus.BAD_REQUEST, HttpMessage.ERROR);
    }
  }
}
