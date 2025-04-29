import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'department' })
export class Recipe {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field((type) => [String], { nullable: true })
  subDepartment?: string[];
}
