import { Injectable } from '@nestjs/common';
import { TokenService } from 'src/services/token/token.service';
import { getUser } from 'src/util/prisma.util';
import { LoginInfo } from './login.controller';
const bcrypt = require('bcrypt');

interface LoginResult {
  success: boolean;
  token?: string;
  errors?: string[];
}

@Injectable()
export class LoginService {
  constructor(private tokenService: TokenService) {}

  async login(loginInfo: LoginInfo): Promise<LoginResult> {
    let result: LoginResult = {
      success: false,
      errors: ['Invalid username or password'],
    };

    const user = await getUser(
      loginInfo.usernameOrEmail,
      loginInfo.usernameOrEmail,
      false,
    );

    if (!user) {
      return result;
    }

    const isPasswordMatch = await bcrypt.compare(
      loginInfo.password,
      user.password,
    );

    if (!isPasswordMatch) {
      return result;
    }

    const token = this.tokenService.generateToken(loginInfo.usernameOrEmail);

    result.success = true;
    result.token = token;
    result.errors = [];
    return result;
  }
}
