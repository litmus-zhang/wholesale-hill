import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { gqlResponse, UserInput } from './models/user.model';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto-js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async signup(dto: UserInput): Promise<gqlResponse> {
    try {
      const user = await this.userRepository.findOneBy({
        username: dto.username,
      });

      if (user) {
        throw new BadRequestException('user already exists');
      }

      // Hash password with Argon2
      const hash = await argon.hash(dto.password);

      // Create new user
      const newUser = this.userRepository.create({
        username: dto.username,
        password: hash,
      });

      await this.userRepository.save(newUser);

      return {
        message: 'User created successfully',
        status: HttpStatus.OK,
      };
    } catch (err) {
      return {
        message: 'Error creating user: ' + err.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async login() {
    return {} as any;
  }
}
