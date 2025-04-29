import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';


@ObjectType()
export class Department {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;


  @Field(() => Department, { nullable: true })
  parentDepartment?: Department;

  @Field(() => [Department], { nullable: true })
  childDepartments?: Department[];

}



@InputType()
export class CreateDepartmentInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Department name must be at least 2 characters' })
  @MaxLength(50, { message: 'Department name cannot exceed 50 characters' })
  name: string;

  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  parentDepartmentId?: string;
}