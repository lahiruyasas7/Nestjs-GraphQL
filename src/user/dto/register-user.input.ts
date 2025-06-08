import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class RegisterUserInput {
  @IsString()
  @Field()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsEmail()
  @Field()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  password: string;
}
