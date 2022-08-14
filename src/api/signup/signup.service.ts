import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';
import { getUserByUsernameOrEmail } from 'src/util/prisma.util';
import { ValidatorService } from 'src/services/validator/validator.service';
import prisma from 'prisma/prisma';
import { SignupInfo } from './signup.controller';
const bcrypt = require('bcrypt');

interface SignupResult {
  success: boolean;
  errors?: string[];
  user?: User;
}

@Injectable()
export class SignupService {
  constructor(private validatorService: ValidatorService) {}

  async signup(signupInfo: SignupInfo): Promise<SignupResult> {
    const { email, username, password } = signupInfo;
    const user = await getUserByUsernameOrEmail(email, username, false);

    if (user) {
      const res: SignupResult = {
        success: false,
        errors: ['Username or email already exists'],
      };

      return res;
    }

    const validationResult = this.validatorService.validateUser(
      email,
      username,
      password,
    );

    if (!validationResult.success) {
      const res: SignupResult = {
        success: false,
        errors: validationResult.error.issues.map((v) => v.message),
      };
      return res;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    const res: SignupResult = {
      success: true,
      user: createdUser,
    };

    return res;
  }
}
