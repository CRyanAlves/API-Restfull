import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Order from './Order';
import Product from '@modules/products/typeorm/entities/Product';

@Entity({ name: 'orders_products' })
export default class OrdersProducts {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'decimal', name: 'price' })
  price: number;

  @Column({ type: 'int', name: 'quantity' })
  quantity: number;

  @ManyToOne(() => Order, order => order.order_products)
  //aqui damos um apelido a tabela order e dizemos sua relação com a tabela order (o que ira trazer de lá)
  @JoinColumn({ name: 'order_id' })
  order: Order;
  //pode ter muitos pedidos nessa tabela
  //para pegar esses pedidos agente faz nas duas tabelas um jeito de passar todos os registros da quele pedido

  @ManyToOne(() => Product, product => product.order_products)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
