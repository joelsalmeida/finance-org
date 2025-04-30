import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, TokenGeneratorPort } from '../../../auth/ports/out';

@Injectable()
export class JwtTokenGeneratorService implements TokenGeneratorPort {
  constructor(private jwtService: JwtService) {}

  sign(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
}
