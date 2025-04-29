import { Module } from '@nestjs/common';
import { DepartmentResolver } from './department.resolver';
import { DepartmentService } from './department.service';
import {Department} from '../database/entities/department.entity'
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  controllers: [],
  providers: [DepartmentResolver, DepartmentService],
})
export class DepartmentModule {}
