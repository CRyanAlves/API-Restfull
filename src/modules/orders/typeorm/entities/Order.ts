import Customer from '@modules/customers/typeorm/entities/Customer';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import OrdersProducts from './OdersProducts';

@Entity({ name: 'orders' })
export default class Order {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => OrdersProducts, order_products => order_products.order, { cascade: true })
  order_products: OrdersProducts[]
  //por ser One to many passamos com um array pois tem muitas OrdersProducts relacionados a Order 

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
