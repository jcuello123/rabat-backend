import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';
import { ValidatorService } from 'src/validator/validator.service';
import prisma from '../../prisma/prisma';
const bcrypt = require('bcrypt');

interface SignupResult {
  success: boolean;
  errors?: string[];
  user?: User;
}

@Injectable()
export class SignupService {
  constructor(private validatorService: ValidatorService) {}

  async signup(
    email: string,
    username: string,
    password: string,
  ): Promise<SignupResult> {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: {
              equals: username,
              mode: 'insensitive',
            },
          },
          {
            email: {
              equals: email,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: { items: true },
    });

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
