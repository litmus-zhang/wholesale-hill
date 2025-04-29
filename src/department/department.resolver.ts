import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { Department, CreateDepartmentInput } from './models/department.model';
import { gqlResponse } from '../auth/models/user.model';

@Resolver(() => Department)
export class DepartmentResolver {
    constructor(private readonly departmentService: DepartmentService) { }

    @Mutation(() => Department)
    async createDepartment(
        @Args('input') createDepartmentInput: CreateDepartmentInput,
    ) {
        return this.departmentService.createDepartment(createDepartmentInput);
    }
    @Mutation(() => gqlResponse)
    async updateDepartment(
        @Args('input') createDepartmentInput: CreateDepartmentInput,
        @Args('id') id: number,

    ) {
        return this.departmentService.updateDepartment(id, createDepartmentInput);
    }
    @Mutation(() => gqlResponse)
    async deleteDepartment(
        @Args('id') id: number,
    ) {
        return this.departmentService.deleteDepartment(id);
    }
    @Query(() => [Department])
    async getDepartments() {
        return this.departmentService.getDepartments();
    }
}