import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { gqlResponse, User, UserInput } from './models/user.model';
import { AuthService } from './auth.service';
import { Body, NotFoundException } from '@nestjs/common';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => User)
  async signup(@Body('user_input') dto: UserInput): Promise<gqlResponse> {
    return this.authService.signup(dto);
  }
}
