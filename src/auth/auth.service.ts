import { BadRequestException, ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { gqlResponse, UserInput , loginResponse} from './models/user.model';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: UserInput): Promise<gqlResponse> {
    try {
      const user = await this.userRepository.findOneBy({
        username: dto.username,
      });

      if (user) {
        throw new BadRequestException('user already exists');
      }
      console.log({dto})

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

  async login(dto: UserInput): Promise<loginResponse> {
    try{
      // check if username 
      const user = await this.userRepository.findOneBy({
          username: dto.username,
        
      });
      if (!user) throw new ForbiddenException('Invalid credentials');
      const passwordMatch = await argon.verify(user.password, dto.password);
      if (!passwordMatch) throw new ForbiddenException('Invalid credentials');
  
      const token = await this.signToken(user.id, user.username);
      return {
        message: 'user login successfully', 
        status: HttpStatus.ACCEPTED,
        token: token.access_token
      }
      

    }catch(err){
      return {
        message: 'Error Login in user: ' + err.message,
        status: HttpStatus.BAD_REQUEST,
        token: null
      };
    }
  }

  async signToken(
    userId: number,
    username: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, username };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });
    return {
      access_token: token,
    };
  }
}
