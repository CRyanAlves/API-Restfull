import OrdersProducts from '@modules/orders/typeorm/entities/OdersProducts';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export default class Product {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @OneToMany(() => OrdersProducts, order_products => order_products.product)
  order_products: OrdersProducts[]

  @Column({ name: 'name' })
  name: string;

  @Column({ type: 'decimal', name: 'price' })
  price: number;

  @Column({ type: 'int', name: 'quantity' })
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
