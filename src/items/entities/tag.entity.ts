import { AbstractEntity } from '../../database/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Tag extends AbstractEntity<Tag> {
  @Column()
  content: string;

  @ManyToOne(() => Item, (item) => item.comments)
  item: Item;
}
