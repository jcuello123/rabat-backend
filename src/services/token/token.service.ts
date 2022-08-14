import { Injectable } from '@nestjs/common';
const jwt = require('jsonwebtoken');

@Injectable()
export class TokenService {
  private readonly THIRTY_MINUTES = Math.floor(Date.now() / 1000) + 60 * 30;

  generateToken(username: string): string {
    const token = jwt.sign(
      { data: username, exp: this.THIRTY_MINUTES },
      process.env.TOKEN_SECRET,
    );
    return token;
  }
}
