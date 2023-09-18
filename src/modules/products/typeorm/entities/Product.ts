import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm'

@Entity({name: 'products'})
export default class Product {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({name: 'name'})
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