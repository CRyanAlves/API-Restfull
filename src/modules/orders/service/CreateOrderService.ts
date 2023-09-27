import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';
import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import ProductRepository from '@modules/products/typeorm/repositories/ProductsRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export default class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customerRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customerRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given');
    }

    const existsProducts = await productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids');
    }

    const existsProductsIds = await existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
      // essa variável pega os produtos que n existem mais e armazena aqui
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find any product ${checkInexistentProducts[0].id}`,
      );
    }

    const quantityAvailable = await products.filter(
      (
        product, // do array enviado eu percorro cada produto
      ) =>
        existsProducts.filter(
          p =>
            p.id ===
            product.id /*compara o id do produto enviado com id que existe no banco */,
        )[0].quantity < product.quantity, //ve se quantidade solicitada tem em estoque
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
        // subtraio da quantidade em estoque
    }));

    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}
