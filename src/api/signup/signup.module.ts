import { Module } from '@nestjs/common';
import { ValidatorService } from 'src/validator/validator.service';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';

@Module({
  controllers: [SignupController],
  providers: [SignupService, ValidatorService],
})
export class SignupModule {}
