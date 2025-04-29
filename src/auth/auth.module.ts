import { Module, Global } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
