import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { Logger } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.unput';

@Resolver(() => User)
export class UserResolver {
  private readonly logger = new Logger(UserResolver.name);
  constructor(private readonly userService: UserService) {}
  @Query(() => [User], { name: 'users' })
  async findAll() {
    return await this.userService.findAll();
  }

  @Query(() => User)
  getUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @ResolveField('profile')
  async profile(@Parent() user: User) {
    this.logger.debug(`Fetching profile for user ${user.id}`);
    return await user.profile;
  }

    // @Mutation(() => User)
    // async createUser(@Args('user') user: User) {
    //   return await this.userService.createUser(user);
    // }

  // @Mutation(() => User)
  // updateUser(
  //   @Args('id', { type: () => Int }) id: number,
  //   @Args('updateUserInput') updateUserInput: UpdateUserInput,
  // ) {
  //   return this.userService.update(id, updateUserInput);
  // }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
