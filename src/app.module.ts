import { Module } from '@nestjs/common';
import { SignupModule } from './api/signup/signup.module';
import { ValidatorService } from './services/validator/validator.service';
import { ValidatorModule } from './services/validator/validator.module';
import { LoginModule } from './api/login/login.module';
import { TokenService } from './services/token/token.service';
import { TokenModule } from './services/token/token.module';

@Module({
  imports: [SignupModule, ValidatorModule, LoginModule, TokenModule],
  controllers: [],
  providers: [ValidatorService, TokenService],
})
export class AppModule {}
