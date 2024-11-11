import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaService } from './utils/prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
