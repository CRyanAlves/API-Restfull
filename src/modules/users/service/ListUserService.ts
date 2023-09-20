import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

export default class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = usersRepository.find();

    if (!users) {
      throw new AppError('Users not found');
    }
    return users;
  }
}
