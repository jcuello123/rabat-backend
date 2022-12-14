import { Module } from '@nestjs/common';
import { SignupModule } from './api/signup/signup.module';
import { ValidatorService } from './services/validator/validator.service';
import { ValidatorModule } from './services/validator/validator.module';
import { LoginModule } from './api/login/login.module';
import { TokenService } from './services/token/token.service';
import { TokenModule } from './services/token/token.module';
import { ItemsModule } from './api/items/items.module';
import { RenewTokenModule } from './api/renew-token/renew-token.module';

@Module({
  imports: [
    SignupModule,
    ValidatorModule,
    LoginModule,
    TokenModule,
    ItemsModule,
    RenewTokenModule,
  ],
  controllers: [],
  providers: [ValidatorService, TokenService],
})
export class AppModule {}
