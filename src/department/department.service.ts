import { BadRequestException, HttpStatus, Injectable, UseGuards, NotFoundException } from '@nestjs/common';
import { Department, CreateDepartmentInput } from './models/department.model';
import {Department as Dto} from '../database/entities/department.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { gqlResponse } from 'src/auth/models/user.model';
import { JwtGuard } from '../auth/guards';

@UseGuards(JwtGuard)
@Injectable()
export class DepartmentService {
    constructor(
            @InjectRepository(Dto)
            private departmentRepository: Repository<Dto>,
    ){}
  async createDepartment(
    dto: CreateDepartmentInput,
  ): Promise<Department> {
    // In a real implementation, you would:
    // 1. Check if parentDepartmentId exists if provided
    // 2. Prevent circular references
    // 3. Save to database

    const department = await this.departmentRepository.findOneBy({
        name: dto.name
    })

    if (department){
        throw new BadRequestException("department already exist")
    }

    const newDepartment = await this.departmentRepository.create({
        name: dto.name,
    })

    await this.departmentRepository.save(newDepartment)

    
    return {
      id: newDepartment.id,
      ...dto,
    };
  }

  async deleteDepartment(id: number): Promise<gqlResponse> {
    const department = await this.departmentRepository.findOneBy({
        id: id
    })  
    if(department){
        await this.departmentRepository.delete(department.id)
        return {
            message: "Department deleted successfully",
            status: HttpStatus.ACCEPTED
        }
    } else{
        throw new NotFoundException()
    }
}
  async updateDepartment(id: number, updateInput: CreateDepartmentInput ){
    const department = await this.departmentRepository.findOneBy({
        id: id
    })  
    if(department){
        await this.departmentRepository.update(department.id, updateInput )
        return {
            message: "Department updated successfully",
            status: HttpStatus.ACCEPTED
        }
    } else{
        throw new NotFoundException()
    }
  }
  async getDepartments(): Promise<Department[]>{
    const data = await this.departmentRepository.find()
    console.log(data)
    return data
  }
}