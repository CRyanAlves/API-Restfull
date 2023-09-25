import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findAllByIds(products: IFindProducts[], ): Promise<Product[]> {
    const productIds = products.map(product => product.id)
    // pego todos os ids faço um map e armazeno dentro da variavel
    const existsProducts = await this.find({
      where: {
        id: In(productIds) //"In()" procura os ids dentro de uma lista
        // aqui validamos todos os ids para saber se existem mesmo
      }
    })
    
    return existsProducts;
  }
}
