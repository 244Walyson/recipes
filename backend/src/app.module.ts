import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaService } from './utils/prisma.service';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
