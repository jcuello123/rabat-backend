import { Module } from '@nestjs/common';
import { SignupModule } from './signup/signup.module';
import { ValidatorService } from './validator/validator.service';
import { ValidatorModule } from './validator/validator.module';

@Module({
  imports: [SignupModule, ValidatorModule],
  controllers: [],
  providers: [ValidatorService],
})
export class AppModule {}
