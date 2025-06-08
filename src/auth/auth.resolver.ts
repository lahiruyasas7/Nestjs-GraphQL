import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterUserInput } from 'src/user/dto/register-user.input';
import { LoginUserInput } from 'src/user/dto/login-user.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async register(@Args('input') input: RegisterUserInput) {
    const { email, username, password } = input;
    const { access_token } = await this.authService.register(email, username, password);
    return access_token;
  }

  @Mutation(() => String)
  async login(@Args('input') input: LoginUserInput) {
    const { email, password } = input;
    const { access_token } = await this.authService.loginUser(email, password);
    return access_token;
  }
}
