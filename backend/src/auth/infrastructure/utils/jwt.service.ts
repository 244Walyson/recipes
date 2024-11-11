import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtService } from 'src/auth/core/interfaces/jwt/jwt.service.interface';

@Injectable()
export class JwtServiceImpl implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: any): string {
    return this.jwtService.sign(payload);
  }
  async verify(token: string) {
    return this.jwtService.verify(token);
  }
  async decode(token: string) {
    return this.jwtService.decode(token);
  }
}
