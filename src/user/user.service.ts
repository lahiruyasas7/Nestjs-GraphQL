import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
// import { CreateUserInput } from './dto/register-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    return await this.userRepo.findOneByOrFail({ id });
  }

  // async createUser(createUserInput: CreateUserInput) {
  //   const newUser = this.userRepo.create(createUserInput);
  //   return await this.userRepo.save(newUser);
  // }

  // async update(id: number, updateUserInput: UpdateUserInput) {
  //   const user = await this.userRepo.findOneByOrFail({ id });

  //   return await this.userRepo.save(
  //     new User(Object.assign(user, updateUserInput)),
  //   );
  // }

  async remove(id: number) {
    const result = await this.userRepo.delete({ id });
    return result.affected === 1;
  }

  create(data: Partial<User>) {
    return this.userRepo.save(data);
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }
}
