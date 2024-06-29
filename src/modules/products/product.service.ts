import { Injectable } from '@nestjs/common';
import { ProductDto } from 'src/dto/product.dto';
import { Product } from 'src/models/product.model';

@Injectable()
export class ProductService {
  private products: Product[] = [
    { id: 1, categoryId: 2, price: 80000, productName: 'Keyboard' },
    { id: 2, categoryId: 3, price: 90000, productName: 'Nine Dev' },
  ];

  getProduct(): Product[] {
    return this.products;
  }

  createProduct(productDto: ProductDto): Product {
    const product: Product = {
      id: Math.random(),
      ...productDto,
    };
    this.products.push(product);
    return product;
  }

  detailProduct(id: number): Product {
    return this.products.find((item) => item.id === id);
  }

  updateProduct(id: number, productDto: ProductDto): Product {
    const index = this.products.findIndex((item) => item.id === id);
    this.products[index].categoryId = productDto.categoryId;
    this.products[index].price = productDto.price;
    this.products[index].productName = productDto.productName;

    return this.products[index];
  }

  deleteProduct(id: number): boolean {
    const index = this.products.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.products.slice(index, 1);
      return true;
    }

    return false;
  }
}
