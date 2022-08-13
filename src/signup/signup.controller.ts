import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { SignupService } from './signup.service';
import { Response } from 'express';

class RequestBody {
  email: string;
  username: string;
  password: string;
}

@Controller('signup')
export class SignupController {
  constructor(private signupService: SignupService) {}

  @Post()
  async signup(
    @Body() requestBody: RequestBody,
    @Res() res: Response,
  ): Promise<void> {
    const { email, username, password } = requestBody;
    const signupResult = await this.signupService.signup(
      email,
      username,
      password,
    );

    if (!signupResult.success) {
      if (signupResult.errors[0] === 'Username or email already exists') {
        res
          .status(HttpStatus.CONFLICT)
          .json({ user: null, message: signupResult.errors[0] });
      } else {
        res.status(HttpStatus.BAD_REQUEST).json(signupResult.errors);
      }
    }

    res.status(HttpStatus.CREATED).json(signupResult.user);
  }
}
