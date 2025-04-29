import { Module } from '@nestjs/common';
import { AppResolver } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    DatabaseModule,
    AuthModule,
    DepartmentModule,
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}
