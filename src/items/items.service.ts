import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const listing = new Listing({
      ...createItemDto.listing,
      rating: 0,
    });
    const item = new Item({
      ...createItemDto,
      listing,
    });
    await this.entityManager.save(item);
  }

  async findAll() {
    return this.itemsRepository.find({
      relations: { listing: true },
    });
  }

  async findOne(id: number) {
    return await this.itemsRepository.findOne({
      where: { id },
      relations: { listing: true, comments: true },
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemsRepository.findOneBy({ id });

    item.public = updateItemDto.public;
    const comments = updateItemDto.comments.map((item) => new Comment(item));
    item.comments = comments;
    await this.itemsRepository.save(item);
  }

  async remove(id: number) {
    await this.itemsRepository.delete(id);
  }
}
