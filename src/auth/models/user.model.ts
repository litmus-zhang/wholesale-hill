import { Directive, Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsStrongPassword } from 'class-validator';

@ObjectType({ description: 'user' })
export class User {
  @Field((type) => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType({ description: 'gqlResponse' })
export class gqlResponse {
  @Field()
  message: string;

  @Field()
  status: number;
}

@ObjectType({ description: 'loginResponse' })
export class loginResponse {
  @Field()
  message: string;

  @Field()
  status: number;

  @Field({nullable: true})
  token?: string;
}

@InputType()
export class UserInput {
  @Field()
  @IsString()
  username: string;

  @Field()
  @IsStrongPassword()
  password: string;
}
