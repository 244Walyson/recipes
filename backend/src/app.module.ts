import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaService } from './utils/prisma.service';
import { AuthModule } from './auth/auth.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [UserModule, AuthModule, RecipeModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
