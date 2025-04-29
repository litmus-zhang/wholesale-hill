import { Directive, Field, ID, InputType, ObjectType } from '@nestjs/graphql';

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

  @Field({ nullable: true })
  data?: Object;
}

@InputType()
export class UserInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
