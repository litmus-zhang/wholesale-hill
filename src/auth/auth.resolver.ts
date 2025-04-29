import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { gqlResponse, User, UserInput, loginResponse } from './models/user.model';
import { AuthService } from './auth.service';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => gqlResponse)
  async signup(@Args('user_input') dto: UserInput): Promise<gqlResponse> {
    return this.authService.signup(dto);
  }
  @Mutation((returns) => loginResponse)
  async login(@Args('user_input') dto: UserInput): Promise<loginResponse> {
    return this.authService.login(dto);
  }
}
