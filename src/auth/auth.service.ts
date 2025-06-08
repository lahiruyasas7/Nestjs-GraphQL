import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(email: string, username: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);

    const doesUserExist = await this.userService.findByEmail(email);

    if (doesUserExist) {
      throw new BadRequestException('User is already exists');
    }
    const user = await this.userService.create({
      email,
      username,
      password: hashed,
    });
    //console.log('user', user);
    return this.login(user);
  }

  async loginUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.login(user);
  }

  private login(user: any) {
    const payload = { sub: user.id, role: user.role };
    const access_token = this.jwtService.signAsync(payload);
    return {
      access_token,
      user,
    };
  }
}
