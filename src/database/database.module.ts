import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Department } from './entities/department.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database.sql',
      entities: [User, Department],
      synchronize: process.env.NODE_ENV === 'production' ? true : false,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
