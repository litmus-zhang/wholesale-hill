import { Module, Global } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { User } from '../database/entities/user.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({}),
  ],
  controllers: [],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule { }
